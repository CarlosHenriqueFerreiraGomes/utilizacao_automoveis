import { Request, Response } from "express";
export class HealthCheckController {

  check(_req: Request, _res: Response): Response {
    return _res.sendStatus(200)
  }
}