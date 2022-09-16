import dotenv from 'dotenv';

dotenv.config();

const {
  postgres_Host,
  Convert_DB,
  postgres_DB,
  postgres_DB_Ecommerce,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_pass,
  round_hash,
  token_secret,
} = process.env;

export default {
  host: postgres_Host,
  database: Convert_DB === 'test' ? postgres_DB : postgres_DB_Ecommerce,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  crypt_pass: BCRYPT_pass,
  hashround: round_hash,
  token_secret: token_secret,
};
