import { Router } from "express";
const healthCheckRouter: Router = Router();
import { HealthCheckController } from "../controller/HealthCheckController";
const _healthCheckController = new HealthCheckController();

healthCheckRouter.get("/healthcheck", _healthCheckController.check);

export { healthCheckRouter };
