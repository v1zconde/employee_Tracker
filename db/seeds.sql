USE employeesDB

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Lead, 100000, 1"),
    ("Salesperson, 80000, 1"),
    ("Lead Engineer, 150200, 2"),
    ("Software Engineer, 120000, 2"),
    ("Account Manager, 150000, 3"),
    ("Accountant, 125000, 3"),
    ("Legal Team Lead, 250000, 4"),
    ("Lawyer, 190000, 4"),
