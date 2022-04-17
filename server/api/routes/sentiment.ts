import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import HttpException from "../../exceptions/HttpException";
import ProcessComments from "../../services/ProcessComments";
import utilities from "../../utilities";

const route = Router();
export default (app: Router): void => {
   app.use("/sentiment/youtube", route);
   route.get(
      "/vidiodetails",
      async (req: Request, res: Response, next: NextFunction) => {
         const logger: Logger = Container.get("logger");
         try {
            const url = req.query.url as string;
            if (!utilities.url.isUrl(url))
               throw new HttpException(422, "Invalid url.");

            const videoId = utilities.url.extractVidioId(url);
            if (videoId === "") throw new HttpException(422, "Invalid url.");

            logger.debug(
               "Calling youtube/vidiodetails endpoint with vidioId: %o",
               videoId
            );

            const processComments = Container.get(ProcessComments);
            const vidioDetails = await processComments.getVideoDetails(videoId);
            res.status(200).json({
               status: "success",
               data: vidioDetails,
            });
         } catch (error) {
            next(error);
         }
      }
   );

   route.get(
      "/comments",
      async (req: Request, res: Response, next: NextFunction) => {
         const logger: Logger = Container.get("logger");
         try {
            const url = req.query.url as string;
            const nextPageToken = req.query.nextPageToken as string;
            console.log(nextPageToken ? nextPageToken : "");

            if (!utilities.url.isUrl(url))
               throw new HttpException(422, "Invalid url.");

            const videoId = utilities.url.extractVidioId(url);
            if (videoId === "") throw new HttpException(422, "Invalid url.");

            logger.debug(
               "Calling youtube/comments endpoint with vidioId: %o",
               videoId
            );

            const processComments = Container.get(ProcessComments);
            const data = await processComments.getComments(
               videoId,
               nextPageToken ? nextPageToken : ""
            );
            res.status(200).json({
               status: "success",
               data,
            });
         } catch (error) {
            next(error);
         }
      }
   );
};
