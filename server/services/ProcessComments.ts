import { Service, Inject, Container } from "typedi";
import { Logger } from "winston";
import utilities from "../utilities";
import YoutubeComment from "./YoutubeComment";
import YoutubeVideo from "./YoutubeVideo";
import { IAllComments, IComment } from "../interfaces/IComment";
import { IVideoDetails } from "../interfaces/IVideo";
import HttpException from "../exceptions/HttpException";
import Preprocessing from "./Preprocessing";
import NaiveBayes from "./NaiveBayes";

@Service()
export default class ProcessComments {
   constructor(
      @Inject("logger") private logger: Logger,
      @Inject("naiveBayesModel") private naiveBayesModel: NaiveBayesModel,
      @Inject((type) => Preprocessing) private preprocessing: Preprocessing,
      @Inject((type) => NaiveBayes) private naiveBayes: NaiveBayes
   ) {}

   /**
    * GET all comments of a video from youtube.
    * @param {string} url - the url of video that you want to grab the comment.
    * @returns all top level comments.
    */
   public async getAllComments(url: string): Promise<IAllComments> {
      const videoId = utilities.url.extractVidioId(url);
      const videoDetails = await this.getVideoDetails(videoId);
      const allComments: IAllComments = {
         ...videoDetails,
         comments: [],
         totalPositive: 0,
         totalNegative: 0,
         wordClouData: [],
      };
      let pageToken = "";
      let allTerms: Array<string> = [];
      /**
       * loop through all comment pages.
       * because youtube only allowed 100 comments max per request.
       */
      do {
         const {
            nextPageToken,
            comments,
            countPositive,
            countNegative,
            terms,
         } = await this.getComments(videoId, pageToken);
         allTerms = allTerms.concat(terms);
         allComments.comments.push(...comments);
         allComments.totalPositive += countPositive;
         allComments.totalNegative += countNegative;
         pageToken = nextPageToken;
         this.logger.debug(
            `Get comment from page: ${nextPageToken} | total comments: ${comments.length}`
         );
      } while (pageToken);
      allComments.wordClouData = this.generateWordCloudData(allTerms);
      return allComments;
   }

   /**
    * GET video details from api and only get the important data
    * @param {string} vidioId - the id of video that you want to grab the details.
    * @returns {IVideoDetails} details vidio (channelID, Chanel Title, vidio title, desc, thumbnail, publushed at)
    */
   public async getVideoDetails(videoId: string): Promise<IVideoDetails> {
      const youtubeVideoInstance = new YoutubeVideo();
      const rawVideoDetails = await youtubeVideoInstance.getVideoDetail(
         videoId
      );
      // const rawRating = await youtubeVideoInstance.getVideoRaiting(videoId);
      // console.log(rawRating);

      if (rawVideoDetails.error) {
         this.logger.error(`Error at GET video details from youtube API.`);
         throw new HttpException(
            parseInt(rawVideoDetails.error.code),
            rawVideoDetails.error.message
         );
      }
      /**
       * throw error if the video details is empty
       */
      if (rawVideoDetails.items.length === 0) {
         this.logger.error(`Error at GET video details from youtube API.`);
         throw new HttpException(404, "Video not found.");
      }

      const videoDetails: IVideoDetails = {
         channelId: rawVideoDetails.items[0].snippet.channelId,
         channelTitle: rawVideoDetails.items[0].snippet.channelTitle,
         title: rawVideoDetails.items[0].snippet.title,
         description: rawVideoDetails.items[0].snippet.description,
         thumbnails: rawVideoDetails.items[0].snippet.thumbnails.standard.url,
         publishedAt: rawVideoDetails.items[0].snippet.publishedAt,
         likes: rawVideoDetails.items[0].statistics.likeCount,
         view: rawVideoDetails.items[0].statistics.viewCount,
         comments: rawVideoDetails.items[0].statistics.commentCount,
      };

      return videoDetails;
   }

   /**
    * GET comments from api and only get the important data
    * @param {string} vidioId - the id of video that you want to grab the details.
    * @returns {Array<IComment>}
    */
   public async getComments(
      videoId: string,
      nextPageToken: string
   ): Promise<{
      nextPageToken: string;
      comments: Array<IComment>;
      countPositive: number;
      countNegative: number;
      terms: Array<string>;
   }> {
      const comments: Array<IComment> = [];
      const youtubeCommentInstance = new YoutubeComment();
      const rawComments = await youtubeCommentInstance.getComment(
         videoId,
         100,
         nextPageToken
      );
      /**
       * thorw error about youtube api errors.
       */
      if (rawComments.error) {
         this.logger.error(`Error at GET comments from youtube API.`);
         throw new HttpException(
            parseInt(rawComments.error.code),
            rawComments.error.message
         );
      }
      let terms: Array<string> = [];
      let countPositive = 0;
      let countNegative = 0;
      for (let index = 0; index < rawComments.items.length; index++) {
         const rawComment = rawComments.items[index];
         const processedText = this.preprocessing.process(
            rawComment.snippet.topLevelComment.snippet.textOriginal
         );
         terms = terms.concat(processedText);
         let sentiment = "Undefined";
         if (processedText.length > 0) {
            const result = this.naiveBayes.predic(
               processedText,
               this.naiveBayesModel,
               1
            );
            if (result === 1) {
               countPositive++;
               sentiment = "Positive";
            } else if (result === -1) {
               sentiment = "Negative";
               countNegative++;
            }
         }
         const comment: IComment = {
            id: rawComment.id,
            authorDisplayName:
               rawComment.snippet.topLevelComment.snippet.authorDisplayName,
            authorProfileImageUrl:
               rawComment.snippet.topLevelComment.snippet.authorProfileImageUrl,
            textOriginal:
               rawComment.snippet.topLevelComment.snippet.textOriginal,
            processedTest: processedText.join(" "),
            likeCount: rawComment.snippet.topLevelComment.snippet.likeCount,
            publishedAt: rawComment.snippet.topLevelComment.snippet.publishedAt,
            updatedAt: rawComment.snippet.topLevelComment.snippet.updatedAt,
            sentiment: sentiment,
         };
         comments.push(comment);
      }
      return {
         nextPageToken: rawComments.nextPageToken,
         comments,
         countPositive,
         countNegative,
         terms,
      };
   }

   private generateWordCloudData(
      terms: Array<string>
   ): Array<{ term: string; count: number }> {
      const result: Array<{ term: string; count: number }> = [];
      for (let i = 0; i < terms.length; i++) {
         const exist = result.findIndex((e) => e.term === terms[i]);
         if (exist === -1) {
            result.push({
               term: terms[i],
               count: 1,
            });
         } else {
            result[exist].count += 1;
         }
      }
      const totalSlice = result.length > 100 ? 100 : result.length;
      return result.sort((a, b) => b.count - a.count).slice(0, totalSlice);
   }
}
