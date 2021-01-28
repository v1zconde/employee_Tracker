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

    case "UPDATE_ROLE":
    return updateRole();
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