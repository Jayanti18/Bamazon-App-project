DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(25),
price DECIMAL(10,2),
stock_quantity INTEGER(8),
PRIMARY KEY (item_id)
);


SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Barbie", "Toys", 24.99, 100);
