const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const connection = require("./db/connection");
require("console.table");

init();

function init() {
  const logoText = logo({ name: "Rafa Employee Manager" }).render();
  console.log(logoText);
  loadMainMenu();
}

function loadMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do??",
        choices: [
          {
            name: "View all Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View all Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "View all Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "Add EMPLOYEE",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE",
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_ROLE",
          },
          {
            name: "DONE",
            value: "DONE",
          },
        ],
      },
    ])
    .then((response) => {
      handleChoices(response);
    });
}

function handleChoices(choices) {
  switch (choices.choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();

    case "VIEW_ROLES":
      return viewRoles();

    case "VIEW_DEPARTMENTS":
      return viewDepartment();

    case "ADD_DEPARTMENT":
      return addDepartment();

    case "ADD_ROLE":
      return addRoles();

    case "ADD_EMPLOYEE":
    return addEmployee();

    case "REMOVE_EMPLOYEE":
    return delEmployee();

    case "REMOVE_EMPLOYEE":
    return delEmployee();

    case "UPDATE_ROLE":
    return delRole();
    // case "VIEW_DEPARTMENTS":
    // return viewDepartment();
    case "DONE":
      return connection.end();
  }
}

async function viewEmployees() {
  const employee = await db.findAllEmployees();
  console.log("\n");
  console.table(employee);
  loadMainMenu();
}

async function viewDepartment() {
  const department = await db.findAllDepartment();
  console.log("\n");
  console.table(department);
  loadMainMenu();
}

async function viewRoles() {
  const role = await db.findAllRoles();
  console.log("\n");
  console.table(role);
  loadMainMenu();
}

async function addRoles() {
  const department1 = await db.findAllDepartment();
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What the new Role??",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What the salary of the Role??",
      },
      {
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < department1.length; i++) {
            choiceArray.push(department1[i].name);
          }
          return choiceArray;
        },
        message: "What department would you like to add the role?",
      },
    ])
    .then((response) => {
      var chosenDept;
      for (var i = 0; i < department1.length; i++) {
        if (department1[i].name === response.choice) {
          chosenDept = department1[i].id;
        }
      }
      const newRole = db.addNewRole(
        response.roleName,
        response.roleSalary,
        chosenDept
      );
      loadMainMenu();
    });
}


async function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What's the new Department??",
      },
    ])
    .then((response) => {
      const newDepartment = db.addNewDepartment(response.newDepartment);
      console.log("\n");
      console.log(newDepartment);
      //console.table(newRole)
      loadMainMenu();
    });
}




async function addEmployee() {
    const Role = await db.findAllRoles();
    console.table(Role);
    const Manager = await db.findOnlyEmployees();
    console.table(Manager);
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What the first Name??",
        },
        {
          type: "input",
          name: "lastName",
          message: "What the Last Name??",
        },
        {
          name: "role",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < Role.length; i++) {
              choiceArray.push(Role[i].title);
            }
            return choiceArray;
          },
          message: "Whats going to be the role?",
        },
        {
            name: "manChoice",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < Manager.length; i++) {
                choiceArray.push(Manager[i].first_name + " " + Manager[i].last_name);
              }
              return choiceArray;
            },
            message: "Whos the Manager??",
          }
      ])
      .then((response) => {
        var chosenRole;
        for (var i = 0; i < Role.length; i++) {
          if (Role[i].name === response.title) {
            chosenRole = Role[i].id;
          }
        }
        var chosenManager;
        for (var i = 0; i < Manager.length; i++) {
          if (Manager[i].first_name + " " + Manager[i].last_name === response.manChoice) {
            chosenManager = Manager[i].id;
          }
        }
        console.log(chosenRole, chosenManager);
        const newEmployee = db.addNewEmployee(
          response.firstName,
          response.lastName,
          chosenRole, chosenManager
        );
        console.table(newEmployee);
        console.log("\n");
        loadMainMenu();
      });
  }



  
async function delEmployee() {
    const Employee = await db.findOnlyEmployees();
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < Employee.length; i++) {
              choiceArray.push(Employee[i].first_name + " " + Employee[i].last_name);
            }
            return choiceArray;
          },
          message: "What employee want to fire??",
        }
      ])
      .then((response) => {
        var fireEmployee;
        for (var i = 0; i < Employee.length; i++) {
          if (Employee[i].first_name + " " + Employee[i].last_name === response.choice) {
            fireEmployee = Employee[i].id;
          }
        }
        console.log(fireEmployee);
        const firedEmployee = db.removeEmployee(fireEmployee);
        console.table(firedEmployee);
        console.log("\n");
        loadMainMenu();
      });
  }

  async function delRole() {
    const Role = await db.findAllRoles();
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < Role.length; i++) {
              choiceArray.push(Role[i].title);
            }
            return choiceArray;
          },
          message: "What role you want to delete??",
        }
      ])
      .then((response) => {
        var fireRole;
        for (var i = 0; i < Role.length; i++) {
          if (Role[i].title === response.choice) {
            fireRole = Role[i].id;
          }
        }
        const firedRole = db.removeRole(fireRole);
        console.table(firedRole);
        console.log("\n");
        loadMainMenu();
      });
  }