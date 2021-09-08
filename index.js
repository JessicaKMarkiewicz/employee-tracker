const inquirer = require("inquirer");
// Connection to database
const db = require("./db/connection");
// Displays the application title and description
const figlet = require("figlet");
// Displays data in table format
const cTable = require("console.table");
// Adds color to table data
const chalk = require("chalk");

// console.log(chalk.white.bold(figlet.testSync('Employee Tracker')));

function init() {
    inquirer
        .prompt({
            type: "list",
            name: "userChoice",
            message: "Please select what you would like to do:",
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "View All Employees by Role",
                    "View All Employees by Manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "View All Roles",
                    "Add Role",
                    "Remove Role",
                    "View All Departments",
                    "Add Department",
                    "Remove Department",
                    "Exit"
                ],
        })
        .then(({ userChoice }) => {
            switch(userChoice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Employees By Department":
                    viewEmpByDept();
                    break;
                case "View All Employees By Role":
                    viewEmpByRole();
                    break;
                case "View All Employees By Manager":
                    viewEmpByMgr();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Update Employee Manager":
                    updateEmpMngr();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "View All Departments":
                    viewAllDepts();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Remove Department":
                    removeDept();
                    break;
                case "Exit":
                    db.end(); 
                    break;
                
            }
        })
}

init ();


