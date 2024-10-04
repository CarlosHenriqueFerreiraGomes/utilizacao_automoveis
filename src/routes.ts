import { Router } from "express";
import { healthCheckRouter } from "./routes/HealthCheckRoutes";
import { automoveisRouter } from "./routes/AutomoveisRouter";
import { motoristasRouter } from "./routes/MotoristasRouter";
import { utilizacaoRouter } from "./routes/UtilizacaoRouter";

const router: Router = Router();

router.use("/api",
  automoveisRouter,
  motoristasRouter,
  utilizacaoRouter,
);

router.use("/api",
  healthCheckRouter,
);

export { router };
