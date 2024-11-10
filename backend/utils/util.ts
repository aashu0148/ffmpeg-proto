import { Response } from "express";

const createError = (
  res: Response,
  message: string,
  code: number = 400,
  err: any = ""
) => {
  res.status(code).json({
    success: false,
    message: message || "Something went wrong",
    error: err,
  });
};

const createResponse = (
  res: Response,
  data: any,
  code: number = 200,
  paginationObj?: object
) => {
  const output: any = {
    success: true,
    data,
  };
  if (paginationObj) output.pagination = paginationObj;

  res.status(code).json(output);
};

export { createError, createResponse };
