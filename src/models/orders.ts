import client from '../DataBase';

export type orders = {
  order_id?: number;
  time: string;
  users_id: number;
  quantity: number;
  product_id: number;
};
export class listorder {
  async index(): Promise<orders[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM orders ';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`something wrong ${err}`);
    }
  }
  async show(order_id: string): Promise<orders> {
    try {
      const sql = 'SELECT * from orders where id=($1)';
      const connect = await client.connect();
      const result = await connect.query(sql, [order_id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find id Error: ${err}`);
    }
  }
  async create(order: orders): Promise<orders> {
    try {
      const sql = `INSERT INTO orders (time, users_id, quantity, product_id) values($1, $2 ,$3 , $4)  RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.time,
        order.users_id,
        order.quantity,
        order.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable to create  (${order.time}) : ${(err as Error).message}`
      );
    }
  }
  async update(order: orders): Promise<orders> {
    try {
      const connect = await client.connect();
      const sql = `UPDATE users SET  users_id=$1 , quantity=$1, product_id=$3 WHERE 
             time=$4 RETURNING *`;
      const result = await connect.query(sql, [
        order.users_id,
        order.quantity,
        order.product_id,
        order.time,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to update : ${err}`);
    }
  }
  async deleteByid(order_id: string): Promise<orders> {
    try {
      const connect = await client.connect();
      const sql = `DELETE FROM products WHERE order_id=$1 RETURNING product_id `;
      const result = await connect.query(sql, [order_id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to delete by id   : ${err}`);
    }
  }
}
