CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    user_name VARCHAR(50)  NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50)  NOT NULL,
    password VARCHAR(255)  NOT NULL,
    email  VARCHAR(255)
);