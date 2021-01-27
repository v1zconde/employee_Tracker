const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
//require("console.table");


init();

function init(){
    const logoText = logo({name: "Rafa Employee Manager"}).render();
    console.log(logoText);
    loadMainMenu();
}

function loadMainMenu(){
    inquirer.prompt([
        { 
            type: "list",
            name: "choice",
            message: "What would you like to do??",
            choices: [
                {
                    name: "View all Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View all Roles",
                    value: "VIEW_ROLES"
                }
            ]
        }

]).then((response) => {
    



    
  });


}