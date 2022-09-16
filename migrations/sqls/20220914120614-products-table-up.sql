CREATE TABLE  products (
    product_id SERIAL PRIMARY KEY,
    name    VARCHAR(50)  NOT NULL,
    price   INTEGER      NOT NULL,
    seller  VARCHAR(50)  NOT NULL
)