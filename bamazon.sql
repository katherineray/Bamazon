-- Creates database
CREATE DATABASE bamazon_db;

--  Makes it so all of the following code will affect the bamazon_db
USE bamazon_db;

CREATE TABLE products(
	itemid INTEGER auto_increment NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (itemid)
    );

    -- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apex Legends","Video Games",49.99,150),
("The Outer Worlds","Video Games",59.99,200),
("Crate of LaCroix","Food and Drink",24.99,50),
("Silly Shades","Apparel",35.00,5),
("Denium Skinny Jeans","Apparel",45.99,35),
("Luxe Bath Towel","Necessities",39.99,40),
("Captain Marvel","Films",25.99,50),
("Spider Man: Far From Home","Films",19.99,30),
("Cosmic Encounter","Board Games",47.99,35),
("Splendor","Board Games",31.99,25);