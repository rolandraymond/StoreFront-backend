import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_HOST,
  NODE_ENV,
  POSTGRES_DB_TEST, //   test  DataBase
  POSTGRES_DB,     //    dev DataBase
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASS,
  ROUND_HASH,
  TOKEN_SECRET,
} = process.env;

export default {
  host: POSTGRES_HOST,
  database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  crypt_pass: BCRYPT_PASS,
  hashround: ROUND_HASH,
  token_secret: TOKEN_SECRET,
};
