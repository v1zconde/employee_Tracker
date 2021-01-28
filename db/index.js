const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  findOnlyEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name FROM employee ORDER BY employee.id;"
      );
  }
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, role.salary FROM role ORDER BY role.id;"
    );
  }
  findAllDepartment() {
    return this.connection.query(
      "SELECT department.id, department.name FROM department ORDER BY department.id;"
    );
  }
  addNewRole(newRole, newSalary, department) {
    return this.connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [newRole, newSalary, department],
    );
  }
  addNewDepartment(newDepartment) {
    return this.connection.query(
      "INSERT INTO department (name) VALUES (?)",
      [newDepartment],
    );
  }
  addNewEmployee(first, last, role, manager) {
    return this.connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first, last, role, manager],
    );
  }
  removeEmployee(id) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = (?)",
      [id],
    );
  }
  removeDepartment(id) {
    return this.connection.query(
      "DELETE FROM department WHERE id = (?)",
      [id],
    );
  }
  removeRole(id) {
    return this.connection.query(
      "DELETE FROM role WHERE id = (?)",
      [id],
    );
  }
  updateRole(role, id) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [role, id],
    );
  }
  updateManager(manager, id) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [manager, id],
    );
  }
}

module.exports = new DB(connection);
