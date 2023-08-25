SHOW DATABASES;

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
USE restaurant;

-- @block
SHOW TABLES;

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
CREATE TABLE cart (
  id integer PRIMARY KEY AUTO_INCREMENT,
  customer_id VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);
