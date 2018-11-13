import { Configuration, DefaultApi } from './gen/api';

export const api = new DefaultApi(new Configuration({ basePath: 'http://127.0.0.1:8080/v0.1' }));
