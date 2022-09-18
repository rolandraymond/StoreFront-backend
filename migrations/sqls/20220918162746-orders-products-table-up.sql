CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER ,
    product_id INTEGER REFERENCES products(product_id) ,
    order_id   INTEGER REFERENCES orders(id)

);