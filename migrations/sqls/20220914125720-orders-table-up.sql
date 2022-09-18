CREATE TABLE orders (
    id SERIAL PRIMARY  KEY ,
    status  VARCHAR(100)  NOT NULL,
    users_id INTEGER REFERENCES users (id) NOT NULL
    
    

)