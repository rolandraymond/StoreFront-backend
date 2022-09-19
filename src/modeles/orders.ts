import client from '../DataBase';

export type orders = {
    order_id?: number;
    users_id: number
    status: string;
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
            const sql = `INSERT INTO orders (status, users_id) values($1, $2 )  RETURNING *`;
            const conn = await client.connect();
            const result = await conn.query(sql, [
                order.status,
                order.users_id
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `unable to create  (${order.status}) : ${(err as Error).message}`
            );
        }
    }
    async update(order: orders): Promise<orders> {
        try {
            const connect = await client.connect();
            const sql = `UPDATE orders SET  users_id=$1 , status=$2 WHERE 
             users_id=$1 RETURNING *`;
            const result = await connect.query(sql, [
                order.users_id,
                order.status

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
            const sql = `DELETE FROM orders WHERE id=$1 RETURNING users_id `;
            const result = await connect.query(sql, [order_id]);
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`unable to delete by id   : ${err}`);
        }
    }
}
