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
('Noodles and Rice 2');

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
('Spring Rolls', 'Crispy rolls filled with vegetables and served with sweet and sour sauce.', '4.99', 1),
('Potstickers', 'Pan-fried dumplings filled with meat and vegetables.', '5.99', 1),
('Kung Pao Chicken', 'Stir-fried chicken with peanuts, vegetables, and spicy sauce.', '11.99', 2),
('Shrimp Fried Rice', 'Stir-fried rice with shrimp, vegetables, and soy sauce.', '9.99', 3);

-- @block
SELECT * FROM items;

-- @block
DROP TABLE items;


-- @block 
/*inner join returns only the rows where there is a match in both the left (items) table and the right (categories) table 
 based on the specified condition. 
 Rows that do not have matching values are excluded from the result.*/
SELECT * FROM items
INNER JOIN categories
ON categories.id = items.category_id;

-- @block
/* Inner Join
   Select specified column in each table left and right*/
SELECT i.name AS item_name, c.name AS category_name
FROM items i
JOIN categories c ON i.category_id = c.id;

-- @block 
/*Left Join returns all rows from the left (categories) table and the matching rows from the right (items) table.
 If there's no match in the right table, NULL values are filled in for columns from the right table.*/
SELECT * FROM items
LEFT JOIN categories
ON categories.id = items.category_id;

-- @block 
/* right join returns all rows from the right (categories) table and the matching rows from the left (items) table. 
If there's no match in the left table, NULL values are filled in for columns from the left table.*/
SELECT categories.name AS category_name, items.name AS item_name
FROM items
RIGHT JOIN categories ON categories.id = items.category_id;



-- @block 
/*full outer join returns all rows from both the left (categories) and right (items) tables. 
If there's no match in either table, NULL values are filled in for the corresponding columns.*/
/* SELECT categories.name AS category_name, items.name AS item_name
FROM categories
FULL JOIN items ON categories.id = items.category_id; */






