import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/HttpException";

function ErrorMidleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const result = error.message || "Error: Erro Inesperado";
  response.status(status).send({
    status,
    error: true,
    result,
  });
}

export default ErrorMidleware;
