SHOW DATABASES;

-- @block
CREATE TABLE customers (
  id integer PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- @block
INSERT INTO customers (name, address)
VALUES 
('Customer ABC1', 'xyz street  12, Duisburg'),
('Customer ABC2', 'bcd street 12, Duisburg');

-- @block
ALTER TABLE customers

ADD email VARCHAR(255) NOT NULL;

-- @block
UPDATE customers
SET email = 'abc1@gmail.com'
WHERE id = 1;


-- @block
USE restaurant;

-- @block
SHOW TABLES;

-- @block
SELECT * FROM customers;


-- @block
SELECT name, id FROM customers

WHERE name = 'Customer ABC1'
AND address LIKE 'xyz%'
-- AND id > 1

ORDER BY id ASC
LIMIT 2;

-- @block
DROP TABLE customers;




