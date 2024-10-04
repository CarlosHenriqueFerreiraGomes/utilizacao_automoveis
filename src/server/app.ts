import express, { Request } from "express";
import { CorsOptions, } from 'cors'
import * as cors from 'cors'
import { LoadEnv } from "../settings/LoadEnv";
import ErrorMiddleware from "../middleware/ErrorMiddleware";
import { router } from "../routes";
import https from 'https';
import http from 'http';
import fs from 'fs';
import dns from 'dns'

const { URI_PORT } = LoadEnv.instance.env;
const { CERT_SSL_PATH } = LoadEnv.instance.env;
const { KEY_SSL_PATH } = LoadEnv.instance.env;
const { CERT_SSL_PWD } = LoadEnv.instance.env;
const { PORT_SSL } = LoadEnv.instance.env;

const options: CorsOptions = {
  allowedHeaders: [
    "X-TOKEN",
    "token",
    "Content-Type",
    "authorization",
    "x-api-key",
  ],
  origin: "*",
  maxAge: 864000,
  methods: "POST,GET,PUT,OPTIONS,DELETE,PATCH",
  preflightContinue: false,
};

export class App {
  public server: express.Application;
  public httpsServer: any;

  constructor() {
    this.server = express();
    this.server.use(cors.default(options));
    this.server.use(express.urlencoded({ extended: true, limit: "25mb" }));
    this.server.use(express.json({ limit: '25mb' }));
    this.initializeMiddlewares();
    this.initializeErrorHandling();
    this.initializeRouter();
    if (URI_PORT !== '9090') {
      this.generateServers();
      this.startHttpsServer();
    }
  }

  public startHttpsServer() {
    if (this.httpsServer) {
      this.httpsServer.listen(PORT_SSL, () => {
        console.log(`=================================`);
        console.log(`  🚀 App listening HTTPS `);
        console.log(`=CERT_SSL_PATH==${CERT_SSL_PATH}`);
        console.log(`=KEY_SSL_PATH==${KEY_SSL_PATH}`);
      });
    }
  }
  public listen() {
    this.server.listen(URI_PORT, () => {
      console.log(`App listening on the port ${URI_PORT}`);
    });
  }

  private initializeRouter() {
    this.server.use(router);
  }

  private initializeMiddlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  }
  private initializeErrorHandling() {
    this.server.use(ErrorMiddleware);
  }

  public generateServers() {
    if (!fs.existsSync(KEY_SSL_PATH) || !fs.existsSync(CERT_SSL_PATH)) {
      console.log("Arquivos SSL não encontrados. O servidor HTTPS não será iniciado.");
      return;
    }

    const options: https.ServerOptions<typeof http.IncomingMessage, typeof http.ServerResponse> = {
      secureProtocol: 'TLSv1_2_method',
      key: fs.readFileSync(KEY_SSL_PATH),
      cert: fs.readFileSync(CERT_SSL_PATH),
      passphrase: CERT_SSL_PWD
    };
    // fixing 
    dns.setDefaultResultOrder("ipv4first");
    this.httpsServer = https.createServer(options, this.server);
  }
}
