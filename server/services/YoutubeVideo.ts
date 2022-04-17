import { Service } from "typedi";
import config from "../config";
// import got from "got";
import axios from "axios";

@Service()
export default class YoutubeVideo {
   /**
    * GET video details using youtube API
    * @param {string} vidioId - the id of video that you want to grab the details.
    * @returns string of all information about a vidio details.
    */
   public async getVideoDetail(videoId: string) {
      try {
         const response = await axios({
            method: "get",
            baseURL: config.youtubeAPI.url,
            url: "/videos",
            headers: {
               Accept: "application/json",
            },
            params: {
               part: "snippet, statistics",
               key: process.env.YOUTUBE_API_KEY,
               id: videoId,
            },
         });
         return response.data;
      } catch (err: any) {
         return err.response.data;
      }
   }

   // public async getVideoRaiting(videoId: string) {
   //    try {
   //       const response = await axios({
   //          method: "get",
   //          baseURL: config.youtubeAPI.url,
   //          url: "/videos/getRating",
   //          headers: {
   //             Accept: "application/json",
   //          },
   //          params: {
   //             id: videoId,
   //             key: process.env.YOUTUBE_API_KEY,
   //          },
   //       });
   //       return response.data;
   //    } catch (err: any) {
   //       return err.response.data;
   //    }
   // }
}
