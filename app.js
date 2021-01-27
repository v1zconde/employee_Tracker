const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db")
require("console.table");


init();

function init(){
    const logoText = logo({name: "Rafa Employee Manager"}).render();
    console.log(logoText);

}
