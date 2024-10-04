import { App } from "./server/app";
import { LoadEnv } from "./settings/LoadEnv";
const { URI_PORT } = LoadEnv.instance.env;

const app = new App().server.listen(URI_PORT);

export default app;
