CREATE TABLE orders (
    order_id SERIAL PRIMARY  KEY ,
    time  VARCHAR(100)  NOT NULL,
    users_id INTEGER REFERENCES users (id) NOT NULL,
    quantity   INTEGER NOT NULL,
    product_id INTEGER REFERENCES products(product_id) NOT NULL

)