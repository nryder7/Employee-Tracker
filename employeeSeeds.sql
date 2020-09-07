DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("executives"), ("executives");

INSERT INTO role (title, salary, department_id)
VALUES ("cto", 2500000, 1), ("ceo", 2500000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("nick", "ryder", 2, 1), ("mark", "ryder", 1, 1) ;