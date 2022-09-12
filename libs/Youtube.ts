import axios from "axios";
import { IComment } from "../server/interfaces/IComment";
import { IVideoDetails } from "../server/interfaces/IVideo";

export const getVidioDetails = async (url: string) => {
   const vidioDetails = await axios({
      method: "get",
      url: "http://localhost:3000/api/sentiment/youtube/vidiodetails",
      headers: {
         Accept: "application/json",
      },
      params: {
         url,
      },
   });

   const data = vidioDetails.data.data;
   return {
      channelId: data.channelId,
      channelTitle: data.channelTitle,
      profilePicture:
         "https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-300x300.jpg",
      title: data.title,
      description: data.description,
      thumbnails: data.thumbnails,
      publishedAt: data.publishedAt,
      likes: data.likes,
      view: data.view,
      comments: data.comments,
   };
};

export const addTrainData = async (data: any) => {
   const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/train-data/add",
      headers: {
         Accept: "application/json",
         ContentType: "application/json",
      },
      data: {
         url: "http://localhost:3000",
         newData: data,
      },
   });
};

export const getComments = async (url: string, nextPageToken: string) => {
   const comments = {
      positive: [] as IComment[],
      negative: [] as IComment[],
      undefined: [] as IComment[],
   };
   const commentsResponse = await axios({
      method: "get",
      url: "http://localhost:3000/api/sentiment/youtube/comments",
      headers: {
         Accept: "application/json",
      },
      params: {
         url,
         nextPageToken,
      },
   });
   const data = commentsResponse.data.data;
   for (let i = 0; i < data.comments.length; i++) {
      const comment = data.comments[i];
      if (comment.sentiment === "Positive") {
         comments.positive.push({
            ...comment,
         });
      } else if (comment.sentiment === "Negative") {
         comments.negative.push({
            ...comment,
         });
      } else {
         comments.undefined.push({
            ...comment,
         });
      }
   }
   return {
      newComments: comments,
      newTerms: data.terms,
      newNextPageToken: data.nextPageToken,
   };
};
