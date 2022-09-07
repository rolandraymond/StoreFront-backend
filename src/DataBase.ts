import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { postgres_Host, postgres_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const client = new Pool({
  host: postgres_Host,
  database: postgres_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
export default client;
