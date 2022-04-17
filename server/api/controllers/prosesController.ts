import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import ProcessComments from "../../services/ProcessComments";

async function prosesComments(
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> {
   const logger: Logger = Container.get("logger");
   try {
      logger.debug("Calling Proses endpoint with body: %o", req.body);
      const processCommentsInstance = Container.get(ProcessComments);
      const allComments = await processCommentsInstance.getAllComments(
         req.body.url
      );
      res.status(200).json(allComments);
      logger.info(`Success processed url: ${req.body.url}`);
      return;
   } catch (err: any) {
      logger.error(`Error at Proses endpoint: %o`, err.message);
      return next(err);
   }
}
export default { prosesComments };
