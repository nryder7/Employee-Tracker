DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

-- INSERT INTO department (name)
-- VALUES ("executives"), ("executives");

INSERT INTO department (name)
VALUES ("executives"), ("team leads"), ("minions");

INSERT INTO role (title, salary, department_id)
VALUES ("ceo", 1000000.994, 1), ("sales team lead", 100000.979, 2), ("sales agent", 50000.959, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("nick", "ryder", 1); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("mike", "jones", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("zack", "harper", 3, 2);