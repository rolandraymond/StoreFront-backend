import { Pool } from 'pg';
import config from './config';

const sign_in = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

sign_in.on('error', (error: Error) => {
  console.error(error.message);
});

export default sign_in;
