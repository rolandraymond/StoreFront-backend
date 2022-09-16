import client from '../DataBase';
import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = (password: string) => {
  const hashround = parseInt(config.hashround as string);
  return bcrypt.hashSync(`${password}${config.crypt_pass}`, hashround);
};
export type clients = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};
// select users
export class userlist {
  async index(): Promise<clients[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM users ';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`something wrong ${err}`);
    }
  }
  // select id users
  async show(id: string): Promise<clients> {
    try {
      const sql = 'SELECT * from users where id=$1';
      const connect = await client.connect();
      const result = await connect.query(sql, [id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find id Error: ${err}`);
    }
  }
  // create users
  async create(users: clients): Promise<clients> {
    try {
      const sql = `INSERT INTO users (email, user_name, last_name, first_name, password) values($1, $2 ,$3 , $4, $5)  RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        users.email,
        users.user_name,
        users.last_name,
        users.first_name,
        hashPassword(users.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable to create  (${users.first_name}) : ${(err as Error).message}`
      );
    }
  }

  async update(user: clients): Promise<clients> {
    try {
      const connect = await client.connect();
      const sql = `UPDATE users SET email=$1 , first_name=$2 , last_name=$3, user_name=$4 password=$5 WHERE 
             id=$6 RETURNING email , user_name , first_name ,last_name ,id `;
      const result = await connect.query(sql, [
        user.email,
        user.first_name,
        user.last_name,
        user.user_name,
        hashPassword(user.password),
        user.id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to update : ${err}`);
    }
  }
  async sign_in(user_name: string, password: string): Promise<clients | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT password FROM users WHERE user_name=$1`;
      const result = await conn.query(sql, [user_name]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        console.log(`${password}${config.crypt_pass}`);
        const checkpassword = bcrypt.compareSync(
          `${password}${config.crypt_pass}`,
          hashPassword
        );
        console.log(checkpassword);
        if (checkpassword) {
          const sqluserdata =
            'SELECT id , user_name ,email , password , first_name , last_name FROM users WHERE user_name=$1';
          const userdata = await conn.query(sqluserdata, [user_name]);

          return userdata.rows[0];
        }
      }
      // console.log(result)

      conn.release();
      return null;
    } catch (err) {
      throw new Error(`unable to sgin in check user_name: ${err}`);
    }
  }

  async deleteByid(id: string): Promise<clients> {
    try {
      const connect = await client.connect();
      const sql = `DELETE FROM users WHERE id=$1 RETURNING user_name `;
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to delete by id   : ${err}`);
    }
  }
}
