const inquirer = require("inquirer");
// Connection to database
const db = require("./db/connection");
// Displays the application title and description
const figlet = require("figlet");
// Displays data in table format
const cTable = require("console.table");
// Adds color to table data
const chalk = require("chalk");

console.log(chalk.white.bold(`========================================================================================`));
console.log(``);
console.log(chalk.white.bold(figlet.textSync('Employee Tracker')));
console.log(``);
console.log(chalk.white.bold(`========================================================================================`));

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
                    viewEmpByMngr();
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

// VIEW FUNCTIONS BEGIN
// View All Employees - WORKING
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
        console.log(``);
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(`                              ` + chalk.white.bold(` Employees `));
        console.log(chalk.white.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.white.bold(`====================================================================================`));
    });
    init();
};

// View All Roles - WORKING
function viewAllRoles() {
    const sql = `SELECT role.id AS ID, role.title AS Role ,department.name AS Department, role.salary AS Salary
    FROM role, department
    WHERE role.department_id = department.id
    ORDER BY role.id ASC;` 
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(`                              ` + chalk.white.bold(` All Roles `));
        console.log(chalk.white.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.white.bold(`====================================================================================`));
    });
    init();
};

// View All Departments - WORKING
function viewAllDepts() {
    const sql = `SELECT * from department
    ORDER BY department.id ASC;` 
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(`                              ` + chalk.white.bold(` All Departments `));
        console.log(chalk.white.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.white.bold(`====================================================================================`));
    });
    init();
};

// // View Employees by Role
// function viewEmpByRole() {
//     const sql = `SELECT employee.id AS EmployeeID, CONCAT(employee.first_name, " ", employee.last_name) AS EmployeeName, role.title AS Role
//     FROM employee
//     LEFT JOIN role ON employee.role_id = role.id
//     ORDER BY role.id ASC;`
//     db.query(sql, (err, response) => {
//         if (err) {
//         throw(err); 
//         return;
//         }
//         console.log(``);
//         console.log(chalk.white.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.white.bold(` Employee by Role `));
//         console.log(chalk.white.bold(`====================================================================================`));
//         console.table(response);
//         console.log(chalk.white.bold(`====================================================================================`));
//     });
//     init();
// };

// // View Employees by Department
// function viewEmpByDept() {
//     const sql = `SELECT employee.id AS EmployeeID, CONCAT (employee.first_name," ",employee.last_name) AS EmployeeName, department.name AS Department 
//     FROM employee
//     LEFT JOIN role ON employee.role_id = role.id 
//     LEFT JOIN department ON role.department_id = department.id
//     ORDER BY employee.id ASC;`
//     db.query(sql, (err, response) => {
//         if (err) {
//         throw(err); 
//         return;
//         }
//         console.log(``);
//         console.log(chalk.white.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.white.bold(` Employee by Department `));
//         console.log(chalk.white.bold(`====================================================================================`));
//         console.table(response);
//         console.log(chalk.white.bold(`====================================================================================`));
//     });
//     init();
// };

// // View Employees by Manager
// function viewEmpByMngr() {
//     const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, department.name AS Department, employee.id AS EmployeeID, CONCAT(employee.first_name, employee.last_name) AS EmployeeName, role.title AS Role
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
//     INNER JOIN department ON (department.id = role.department_id)
//     ORDER BY manager;`;
//     db.query(query, (err, response) => {
//         if (err) throw err;

//         console.log(``);
//         console.log(chalk.white.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.white.bold(` Employee by Manager `));
//         console.log(chalk.white.bold(`====================================================================================`));
//         console.table(response);
//         console.log(chalk.white.bold(`====================================================================================`));
//     });
//     init();
// };
// VIEW FUNCTIONS END

// REMOVE FUNCTIONS BEGIN
// Remove Role from Role - WORKING
function removeRole(){
    const sql = `SELECT title FROM role`;
    db.query(sql, (err,response) => {
        if (err) {
        throw(err);
        return;
        }
        // Select Roles from Role Table and store into array 
        let roleTitleArr = [];
        response.forEach(role => {
            roleTitleArr.push(role.title);
        })
        // Prompt user to select role they want removed 
        inquirer
        .prompt([
        {
            name: 'roleChoice',
            type: 'list',
            message: 'Select the role you would like to remove:',
            choices: roleTitleArr
        }
        ])
        // Fetch corresponding Role record 
        .then (({roleChoice}) => {
            response.forEach(role => {
                if(roleChoice === role.title) {
                    deleteRoleRecord(roleChoice);
                }
            })
        });
    });
}

// Remove Role Record from Role Table - WORKING
function deleteRoleRecord(roleTitle) {
    db.query(`DELETE FROM role WHERE title = ?`, roleTitle, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(chalk.white.bold(                      ` Role Successfully Removed `));
        console.log(chalk.white.bold(`====================================================================================`));
        // Display Role Table 
        viewAllRoles();
    });
}

// Remove Department from Department Table - WORKING
function removeDept() {
    // Call chooseDept  with action to remove
    chooseDept('remove');
}

// Choose Department on which removal action will be performed
function chooseDept(operation) {
    // Get Department data
    const sql = `SELECT * FROM department`;  
    db.query(sql, (err,response) => {
        if(err) {
        throw(err);
        return;
        }
        // Store Department name in an array 
        let deptNameArr = [];
        response.forEach(dept => {
            deptNameArr.push(dept.name);
        });
        // Ask user which Department they want to remove
        inquirer
        .prompt([
        {
            name: 'deptChoice',
            type: 'list',
            message: 'Select the department you would like to remove:',
            choices: deptNameArr
        }
        ])
        // Fetch corresponding Department record 
        .then (({deptChoice}) => {     
            response.forEach(dept => {
                if(deptChoice === dept.name) {
                    if (operation === 'remove') {
                    deleteDeptRecord(deptChoice); }
                    // When a role is added it is linked to user selected department
                    else if(operation === 'linkrole') 
                    {
                    let tempId = dept.id;
                    // Link Department to Role table
                    addDeptToRole(tempId)  
                    }
                }
            });
        });
    });
}

// Remove Department Name from Department Table - WORKING
function deleteDeptRecord(deptName) {    
    db.query(`DELETE FROM department WHERE name = ?`, deptName, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(chalk.white.bold(                   ` Department Successfully Removed `));
        console.log(chalk.white.bold(`====================================================================================`));
        // Display Department Table
        viewAllDepts();
    });
};

// Remove Employee - WORKING
function removeEmployee() {
    // Call chooseEmployee with action to delete
    chooseEmployee('delete');  
}
// Choose Employee on which removal action will be performed
function chooseEmployee(operation) {
    const sql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`; 
    db.query(sql, (err,response) => {
        if(err){
        throw(err);
        return;
        }
        // Store Employee names in an array 
        let empNameArr = [];
        response.forEach(employee => {
            empNameArr.push(`${employee.first_name} ${employee.last_name}`);
        });
        // Ask user which Employee they want to remove
        inquirer
        .prompt([
        {
            name: 'empChoice',
            type: 'list',
            message: 'Select the employee you would like to remove:',
            choices: empNameArr
        }
        ])
        // Fetch corresponding Employee record 
        .then (({empChoice}) => {     
            response.forEach(employee => {
                if(empChoice === `${employee.first_name} ${employee.last_name}`) {
                    let empId = employee.id;
                    // If removing employee, call deleteEmpRecord
                    if(operation === 'delete')  
                    deleteEmpRecord(empId);
                    // If updating employee role, call updateEmployee
                    if(operation === 'update')  
                    updateEmployee(empId);
                }
            })
        });
    });
}
// Remove Employee Record from Employee Table - WORKING
function deleteEmpRecord(empId) {    
    db.query(`DELETE FROM employee WHERE id = ?`, [empId], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(chalk.white.bold(                       ` Employee Successfully Removed `));
        console.log(chalk.white.bold(`====================================================================================`));
        viewAllEmployees();
    });
};
// REMOVE FUNCTIONS END

// UPDATE FUNCTIONS BEGIN
// Update Employee






init();

