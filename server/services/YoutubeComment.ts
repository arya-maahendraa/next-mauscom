import { Service } from "typedi";
import config from "../config";
// import got from "got";
import axios from "axios";

@Service()
export default class YoutubeComment {
   /**
    * GET comments using youtube API with maximum 100 comments per request
    * @param {string} vidioId - the id of video that you want to grab the comment.
    * @param {number 1 to 100} count - total comments you want to grab. maximum 100.
    * @param {string = ''} nextPageToken - token to grab next page of comments. default empty for first page.
    * @returns string of all information about a vidio comments
    */
   public async getComment(
      videoId: string,
      count: number,
      nextPageToken: string
   ) {
      try {
         // const response = await got({
         //    url: `${config.youtubeAPI.url}/commentThreads`,
         //    headers: {
         //       Accept: "application/json",
         //    },
         //    searchParams: {
         //       part: "snippet",
         //       textFormat: "plainText",
         //       maxResults: count,
         //       videoId: videoId,
         //       key: process.env.YOUTUBE_API_KEY,
         //       pageToken: nextPageToken,
         //    },
         // });
         const response = await axios({
            method: "get",
            baseURL: config.youtubeAPI.url,
            url: "/commentThreads",
            headers: {
               Accept: "application/json",
            },
            params: {
               part: "snippet",
               textFormat: "plainText",
               maxResults: count,
               videoId: videoId,
               key: process.env.YOUTUBE_API_KEY,
               pageToken: nextPageToken,
            },
         });
         return response.data;
      } catch (err: any) {
         return err.response.data;
      }
   }
}
