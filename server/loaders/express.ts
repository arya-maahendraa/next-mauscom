import express, { Response, Request, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
// import cors from 'cors';
import config from "../config";
import routes from "../api";
import { NextServer } from "next/dist/server/next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export default (app: express.Application, next: NextServer): void => {
   app.get("/status", (_req, res) => {
      res.status(200).end();
   });
   app.head("/status", (_req, res) => {
      res.status(200).end();
   });

   // app.use(cors());
   app.use(express.json());

   // Load API routes
   app.use(config.api.prefix, routes());

   // Next Page handler
   app.get("*", (req, res) => {
      return next.render(
         req,
         res,
         `${req.path}`,
         req.query as NextParsedUrlQuery
      );
   });

   /// catch 404 and forward to error handler
   app.use((_req: Request, _res: Response, next: NextFunction) => {
      next(new HttpException(404, "Not Found"));
   });

   /// error handlers
   app.use(
      (
         err: HttpException,
         _req: Request,
         res: Response,
         next: NextFunction
      ) => {
         /**
          * Handle 401 thrown by express-jwt library
          */
         if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ message: err.message }).end();
         }
         return next(err);
      }
   );

   app.use(
      (
         err: HttpException,
         _req: Request,
         res: Response,
         _next: NextFunction
      ) => {
         res.status(err.status || 500);
         res.json({
            errors: {
               message: err.message,
            },
         });
      }
   );
};
