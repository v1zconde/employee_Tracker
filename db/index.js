const connection = require("./connection");
//class for querys
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  //query for all employees with all info.
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  //query all employees
  findOnlyEmployees() {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee ORDER BY id;"
      );
  }
  //query for all roles
  findAllRoles() {
    return this.connection.query(
      "select role.id, role.title, role.salary, department.name from role left join department on role.department_id = department.id ORDER BY role.id;"
    );
  }
  //query all department
  findAllDepartment() {
    return this.connection.query(
      "SELECT id, name FROM department ORDER BY department.id;"
    );
  }
  //query add new role
  addNewRole(newRole, newSalary, department) {
    return this.connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [newRole, newSalary, department],
    );
  }
  //query new department
  addNewDepartment(newDepartment) {
    return this.connection.query(
      "INSERT INTO department (name) VALUES (?)",
      [newDepartment],
    );
  }
  //query new employee
  addNewEmployee(first, last, role, manager) {
    return this.connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first, last, role, manager],
    );
  }
//query remove employee
  removeEmployee(id) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = (?)",
      [id],
    );
  }
  //query remove department
  removeDepartment(id) {
    return this.connection.query(
      "DELETE FROM department WHERE id = (?)",
      [id],
    );
  }
  //query remove role
  removeRole(id) {
    return this.connection.query(
      "DELETE FROM role WHERE id = (?)",
      [id],
    );
  }
  //query update role from employee
  updateRole(role, id) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [role, id],
    );
  }
  //query update manager from employee
  updateManager(manager, id) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [manager, id],
    );
  }
  //query who is a Managers
  findAllManagers() {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE (id in (select manager_id from employee))"
    );
  }
  //query employee by manager
  employeePorManager(manager) {
    return this.connection.query(
      "SELECT CONCAT(first_name,' ',  last_name) As name FROM employee WHERE manager_id = ? ",
      [manager],
    );
  }
  //all Managers with their employees
  managersAndEmployees() {
    return this.connection.query(
      "SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL') INNER JOIN department ON (department.id = role.department_id) ORDER BY manager;",
    );
  }
  //query salary by department
  salarybyDepartment() {
    return this.connection.query(
      "select department.name, sum(role.salary) As Total_salary from employee left join role on employee.role_id = role.id left join department on department_id = department.id group by department.name",
    );
  }
}

module.exports = new DB(connection);
