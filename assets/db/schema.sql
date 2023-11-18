DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- DROP TABLE IF EXISTS departments;
CREATE TABLE  departments (
    id int AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

-- DROP TABLE IF EXISTS role;
CREATE TABLE role ( 
    ID INT AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(50),
    salary DECIMAL,
    department_id INT,
     FOREIGN KEY (department_id)
    REFERENCES departments(ID)
);

-- DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT REFERENCES ID,
    FOREIGN KEY (role_id)
    REFERENCES role(ID)


);

CREATE view displayDept AS SELECT *
FROM departments;

