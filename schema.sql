SHOW DATABASES;

-- @block
USE restaurant;

-- @block
SHOW TABLES;

-- @block
CREATE TABLE customers (
  id integer PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- @block
INSERT INTO customers (name, address, email)
VALUES 
('Customer ABC1', 'xyz street  12, Duisburg', 'email123'),
('Customer ABC2', 'bcd street 12, Duisburg', 'email123');

-- @block
ALTER TABLE customers

ADD email VARCHAR(255) NOT NULL;

-- @block
UPDATE customers
SET email = 'abc1@gmail.com'
WHERE id = 2;

-- @block
SELECT * FROM customers;

-- @block
SELECT name, id, address FROM customers

WHERE name = 'name'
AND address LIKE 'a%'
-- AND id > 1

ORDER BY id ASC
LIMIT 5;

-- @block
DROP TABLE customers;

-- @block
CREATE TABLE categories (
  id integer PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- @block
INSERT INTO categories (name)
VALUES 
('Appetizers'),
('Main Courses'),
('Noodles and Rice');

-- @block
SELECT * FROM categories;

-- @block
DROP TABLE categories;

-- @block
CREATE TABLE items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- @block
INSERT INTO items (name, description, price, category_id )
VALUES 
('Spring Rolls', 'Crispy rolls filled with vegetables and served with sweet and sour sauce.', '4.99', '1'),
('Potstickers', 'Pan-fried dumplings filled with meat and vegetables.', '5.99', '1'),
('Kung Pao Chicken', 'Stir-fried chicken with peanuts, vegetables, and spicy sauce.', '11.99', '2'),
('Shrimp Fried Rice', 'Stir-fried rice with shrimp, vegetables, and soy sauce.', '9.99', '3');

-- @block
SELECT * FROM items;

-- @block
SELECT i.name AS item_name, c.name AS category_name
FROM items i
JOIN categories c ON i.category_id = c.id;
