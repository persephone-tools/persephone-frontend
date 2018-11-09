import { DefaultApi } from './gen/api';
import { Configuration } from './gen/configuration';

const config = new Configuration();
config.basePath = "http://localhost:8080/v0.1";

export const api = new DefaultApi(config);
