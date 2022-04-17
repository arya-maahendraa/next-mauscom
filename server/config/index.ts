import dotenv from "dotenv";

const envIsFound = dotenv.config();
if (envIsFound.error) {
   throw new Error("Couldn't find .env file");
}

export default {
   server_port: parseInt(process.env.SERVER_PORT || `3000`, 10),
   api: {
      prefix: "/api",
   },
   log: {
      level: process.env.LOG_LEVEL || "silly",
   },
   youtubeAPI: {
      url: process.env.YOUTUBE_API_URL,
      key: process.env.YOUTUBE_API_KEY,
   },
};
