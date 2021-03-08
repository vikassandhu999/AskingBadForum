import {NextFunction, Request, Response} from "express";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 5;

export default class Pagination {
  public static pageMiddleware() {
      return async (req: Request, res: Response, next: NextFunction) => {
          let pageNo = (typeof req.query.pageNo === "string")? parseInt(req.query.pageNo , 10) : DEFAULT_PAGE_NUMBER;
          let size = (typeof req.query.size === "string")? parseInt(req.query.size , 10) : DEFAULT_PAGE_SIZE;

          pageNo = (pageNo<0||pageNo===0) ? DEFAULT_PAGE_NUMBER : pageNo;
          size = (size<=5) ? size : DEFAULT_PAGE_SIZE;

          req.pageQuery = {
              pageNo,
              size
          }
          next();
      };
  }
}