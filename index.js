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
                    "View Employees by Department",
                    "View Employees by Role",
                    "View Employees by Manager",
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

// View Functions Begin

// View All Employees
function viewAllEmployees() {
    const sql = `SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, role.salary AS Salary, department.name AS Department
    FROM employee, role, department 
    WHERE employee.role_id = role.id AND role.department_id = department.id 
    ORDER BY employee.id ASC;` 
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(`` + chalk.white.bold(`Employees`));
        console.table(response);
        
    });
    init();
};

// View Employees by Department
function viewEmpByDept() {
    const sql = `SELECT employee.id AS Employee_ID, CONCAT (employee.first_name," ",employee.last_name) AS Employee_Name, department.name AS Department 
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY employee.id ASC;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(`                  ` + chalk.white.bold(`Employees by Department`));
        console.table(response);
    });
    init();
};

// View Employees by Role
function viewEmpByRole(){
    const sql = `SELECT employee.id AS EmployeeID,CONCAT (employee.first_name," ",employee.last_name) AS EmployeeName, role.title AS Role
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    ORDER BY role.id ASC;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(`            ` + chalk.white.bold(`Employees by Role`));
        console.table(response);
    });
    init();
};

// View All Roles
function viewAllRoles() {
    const  sql = `SELECT role.id AS ID, role.title AS Role, department.name AS Department, role.salary AS Salary
    FROM role, department
    WHERE role.department_id = department.id
    ORDER BY role.id ASC;` 
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(`                ` + chalk.white.bold(`All Roles`));
        console.table(response);
    });
    init();
};

// View All Departments
function viewAllDepts() {
    const sql = `SELECT * FROM department
    ORDER BY department.id ASC;` 
    db.promise().query(sql)
    .then(response =>{
        console.log(`                   ` + chalk.white.bold(`All Departments`));
        console.table(response);
    })
    // .catch(e =>{
    //     console.log(e);
    // });
    init ();
};

// View Employees by Manager
function viewEmpByMgr(){
    const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, department.name AS Department, employee.id AS EmployeeID, CONCAT(employee.first_name, employee.last_name) AS EmployeeName, role.title AS Role
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    db.query(query, (err, response) => {
        if (err) throw err;

        console.log(`                   ` + chalk.white.bold(`Employee Manager`));
        console.table(response);
});
init();
};
// VIEW FUNCTIONS END

// REMOVE FUNCTIONS BEGIN
// Remove Role from Role 
function removeRole(){
    const sql = `SELECT title FROM role`;
    db.query(sql, (err,response) =>{
        if(err){
            throw(err);
            return;
        }
        // Select the roles from role table and store into an arr 
        let roleTitleArr =[];
        response.forEach(role => {
            roleTitleArr.push(role.title);
        })
        // Ask the user to pick the role to be removed 
        inquirer
        .prompt([
        {
            name: 'roleChoice',
            type: 'list',
            message: 'Select the role you would like to remove.',
            choices: roleTitleArr
        }
        ])
        // Upon response fetch the corresponding record. 
        .then (({roleChoice})=>{
            response.forEach(role => {
                if(roleChoice ===role.title){
                    deleteRoleRecord(roleChoice);
                }
            })
        });
        });
}

// Delete Role Record from Role
function deleteRoleRecord(roleTitle){
    db.query(`DELETE FROM role WHERE title = ?`, roleTitle, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log(chalk.white(`Role Successfully Removed`));
        // Display Role Table
        viewAllRoles();
    });
}

init();

