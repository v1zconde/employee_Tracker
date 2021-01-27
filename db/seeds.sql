USE employees_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sanitation');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150200, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 150000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Janitor', 40000, 5),
    ('Porter', 40000, 5);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Alejandro', 'Castro', 10, NULL),
    ('Luis', 'Hernandez', 3, NULL),
    ('Amanda', 'Nelson', 4, NULL),
    ('Bethany', 'Green', 5, NULL),
    ('Dan', 'Rosenbaum', 6, NULL),
    ('John', 'Dinsmore', 7, NULL),
    ('Jonathan', 'Smith', 9, NULL),
    ('Rafael', 'Vasquez', 7, NULL),
    ('Sofia', 'Mantas', 2, NULL),
    ('Remmington', 'Doe', 3, NULL),
    ('Shayam', 'Patel', 4, NULL),
    ('Mike', 'Carter', 5, NULL),
    ('Leandro', 'Parrado', 6, NULL),
    ('Jordan', 'Doe', 7, NULL),
    ('Jared', 'Kepner', 8, NULL),
    ('Jose', 'Laro', 4, NULL),
    ('Eric', 'E', 4, NULL);