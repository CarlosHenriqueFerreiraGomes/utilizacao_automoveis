
import { Env } from "interface/Env";
import * as dotenv from "dotenv";
import path from 'path'

interface ILoadedEnv {
  URI_PORT: string | undefined;
  MAX_REDIRECTS: string | undefined;
  REDIRECTION_URI: string | undefined;
  TIMEOUT: string | undefined;
  CERT_SSL_PATH: string | undefined;
  KEY_SSL_PATH: string | undefined;
  CERT_SSL_PWD: string | undefined;
  PORT_SSL: string | undefined;
}

export class LoadEnv {
  static _instance: LoadEnv;
  env: Env;

  private constructor() {
    const loaded = this._loadFromEnv();
    const env = this._validateAndTrimLoadedValues(loaded);
    this.env = env;
    Object.freeze(this);
  }

  static get instance(): LoadEnv {
    if (!this._instance) {
      this._instance = new LoadEnv();
    }
    return this._instance;
  }

  _loadFromEnv(): ILoadedEnv {
    if (
      process.env.NODE_ENV === undefined
    ) {
      dotenv.config({ path: path.join(__dirname, '../../BSAD5.env') });
    }
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === "testing") {
      dotenv.config({ path: path.join(__dirname, '../../.env.testing') });

    }

    return {
      URI_PORT: process.env.URI_PORT,
      MAX_REDIRECTS: process.env.MAX_REDIRECTS,
      REDIRECTION_URI: process.env.REDIRECTION_URI,
      TIMEOUT: process.env.TIMEOUT,
      CERT_SSL_PATH: process.env.CERT_SSL_PATH,
      KEY_SSL_PATH: process.env.KEY_SSL_PATH,
      CERT_SSL_PWD: process.env.CERT_SSL_PWD,
      PORT_SSL: process.env.PORT_SSL,
    };
  }

  _validateAndTrimLoadedValues(val: ILoadedEnv): Env {
    let k: keyof ILoadedEnv;
    let trimVal: any = {};
    for (k in val) {
      if (val[k] === undefined) {
        throw Error(`Error on environment variables loading ${k}`);
      }
      trimVal[k] = val[k]!.trim();
    }
    return trimVal as Env;
  }
}
