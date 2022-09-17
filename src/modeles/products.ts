import client from '../DataBase';

export type prodact = {
  product_id?: number;
  price: number;
  name: string;
  seller: string;
};

export class prodactlist {

  // get all product 
  async getall(): Promise<prodact[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM products ';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`something wrong ${err}`);
    }
  }

  // get prorduct by name 
  async getprodauctByname(name: string): Promise<prodact> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM products WHERE name=$1';
      const result = await connect.query(sql, [name]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get id ${error}`);
    }
  }
  // create users
  async create(p: prodact): Promise<prodact> {
    try {
      const sql = `INSERT INTO products (name, price, seller) values($1, $2 ,$3 )  RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.seller]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable to create  (${p.name}) : ${(err as Error).message}`
      );
    }
  }
  // update  data of product
  async update(p: prodact): Promise<prodact> {
    try {
      const connect = await client.connect();
      const sql = `UPDATE products SET name=$1 , price=$2 , product_id=$3 , seller=$4 `;
      const result = await connect.query(sql, [
        p.name,
        p.price,
        p.product_id,
        p.seller,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to update : ${err}`);
    }
  }
  // delete products by name 
  async deleteByname(name: string): Promise<prodact> {
    try {
      const connect = await client.connect();
      const sql = `DELETE FROM products WHERE name=$1 RETURNING name `;
      const result = await connect.query(sql, [name]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to delete by id   : ${err}`);
    }
  }
}
