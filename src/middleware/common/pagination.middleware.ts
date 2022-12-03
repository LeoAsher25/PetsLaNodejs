import { NextFunction, Request, Response } from "express";
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 0;

const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, size, ...rest } = req.query;
  const _page = page ? Number(page) - 1 : DEFAULT_PAGE;
  const _pageSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
  let matchList: any = {};

  const keys = Object.keys(rest);
  const filterList: any[] = [];

  // if (keys.length > 0) {
  //   keys.forEach((item) => {
  //     console.log("rest", rest, rest[item]);
  //     matchList[item] = {
  //       $regex: /\s*/g,
  //       // new RegExp((rest[item] as string) || /\s*/g)
  //     };
  //   });

  //   filterList.push({
  //     $match: matchList,
  //   });
  // }

  if (_pageSize) {
    filterList.push(
      {
        $skip: _pageSize * _page,
      },
      { $limit: _pageSize }
    );
  }

  console.log("filterList", JSON.stringify(filterList));

  res.locals.filterList = filterList;
  next();
};

export default paginationMiddleware;
