CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO product (name, price, quantity)
VALUES
('Laptop', 899.99, 10),
('Keyboard', 49.99, 25),
('Mouse', 19.99, 40),
('Monitor', 199.99, 15),
('Headphones', 79.99, 20);

SELECT * FROM product;