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
                case "View Employees By Department":
                    viewEmpByDept();
                    break;
                case "View Employees By Role":
                    viewEmpByRole();
                    break;
                case "View Employees By Manager":
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
    const sql = `SELECT role.id AS ID, role.title AS Role, department.name AS Department, role.salary AS Salary
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

// View Employees by Role
function viewEmpByRole() {
    const sql = `SELECT employee.id AS EmployeeID, CONCAT(employee.first_name, " ", employee.last_name) AS EmployeeName, role.title AS Role
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    ORDER BY role.id ASC;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(`                              ` + chalk.white.bold(` Employee by Role `));
        console.log(chalk.white.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.white.bold(`====================================================================================`));
    });
    init();
};

// View Employees by Department
function viewEmpByDept() {
    const sql = `SELECT employee.id AS EmployeeID, CONCAT (employee.first_name, " ",employee.last_name) AS EmployeeName, department.name AS Department 
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY employee.id ASC;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(`                              ` + chalk.white.bold(` Employee by Department `));
        console.log(chalk.white.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.white.bold(`====================================================================================`));
    });
    init();
};

// View Employee by Manager
function viewEmpByMngr() {
    const query = `SELECT CONCAT(manager.first_name, " ", manager.last_name) AS Manager, department.name AS Department, employee.id AS EmployeeID, CONCAT(employee.first_name, " ", employee.last_name) AS EmployeeName, role.title AS Role
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    db.query(query, (err, response) => {
        if (err) throw err;

        console.log(``);
        console.log(chalk.white.bold(`====================================================================================`));
        console.log(`                              ` + chalk.white.bold(` Employee by Manager `));
        console.log(chalk.white.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.white.bold(`====================================================================================`));
    });
    init();
};
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
                    updateEmpRole(empId);
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
        // Display Employees Table
        viewAllEmployees();
    });
};
// REMOVE FUNCTIONS END

// UPDATE FUNCTIONS BEGIN
// Update Employee Information
function updateEmployee() {
    // Call chooseEmployee with action to update
    chooseEmployee('update');  
}
// Update role details of selected Employee ID 
function updateEmpRole(empId) {
    // Get existing Role data from Role table
    const sql = `SELECT * FROM role`;  
    db.query(sql, (err,response) => {
        if(err) {
        throw(err);
        return;
        }
        // Store Role titles in an array 
        let roleTitleArr = [];
        response.forEach(role => {
            roleTitleArr.push(role.title);
        })
        // Ask user which Role they would like to update
        inquirer
        .prompt([
        {
            name: 'roleChoice',
            type: 'list',
            message: 'Select the role you would like to update:',
            choices: roleTitleArr
        }
        ])
        // Fetch corresponding Role record
        .then (({roleChoice}) => {
            response.forEach(role => {
                if(roleChoice === role.title) {
                    // Get Role ID 
                    let roleId = role.id;
                    // Call updateRole function with the choose empId & roleId 
                    updateRole(roleId, empId); 
                }
            })
        });
    });
}

// Update Employee Role based on ID & role_id
function updateRole(newRoleId, empId) {
    let sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            db.query(
                sql,
                [newRoleId, empId],
                (error) => {
                    if (error) throw error;
                    console.log(chalk.white.bold(`====================================================================================`));
                    console.log(chalk.white.bold(                     ` Employee Role Successfully Updated `));
                    console.log(chalk.white.bold(`====================================================================================`));
                    // Display Employees by Role Table
                    viewEmpByRole();
                }
            );
}

// Update Employee Manager
function updateEmpMngr() {
    // Get Employee details from Employee Table 
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id 
    FROM employee`;
    db.query(sql, (error, response) => {
        // Store Employee name in an array 
        let employeeNamesArr = [];
        // Ask user which employee manager needs to be updated &  
        // Ask user to select new manager name from list 
        response.forEach((employee) => {employeeNamesArr.push(`${employee.first_name} ${employee.last_name}`);});  
        inquirer
        .prompt([
        {
            name: 'selectedEmployee',
            type: 'list',
            message: 'Select the employee whose manager needs to be updated:',
            choices: employeeNamesArr
        },
        {
            name: 'newManager',
            type: 'list',
            message: 'Select a manager to assign to employee:',
            choices: employeeNamesArr
        }
        ])

        .then((answer) => {
            // Validate user selection  
            let employeeId, managerId;
            response.forEach((employee) => {
                if (
                    answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`
                ) {
                    employeeId = employee.id;
                    let empRole = employee.role_id;
                }

                if (
                    answer.newManager === `${employee.first_name} ${employee.last_name}`
                ) {
                    managerId = employee.id;
                }
            });

            // If Employee name and Manager name are the same, mark it as an invalid choice.
            if ((answer.chosenEmployee === answer.newManager)) {
                console.log(chalk.white.bold(`====================================================================================`));
                console.log(chalk.white.bold(                ` Sorry, Invalid Manager Selection `));
                console.log(chalk.white.bold(`====================================================================================`));
                promptUserInput();
            } else {
            // Update Employee's Manager 
            let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;

            db.query(
                sql,
                [managerId, employeeId],
                (error) => {
                    if (error) throw error;
                    console.log(chalk.white.bold(`====================================================================================`));
                    console.log(chalk.white.bold(                ` Employee Manager Successfully Updated `));
                    console.log(chalk.white.bold(`====================================================================================`));
                    viewEmpByMngr();
                    }
                );
            }
        });
    });
};
// UPDATE FUNCTIONS END

// ADD FUNCTIONS BEGIN
// Add Department - WORKING
function addDept() {
    // Ask user what Department they'd like to add 
    inquirer
    .prompt([
    {
        name: 'deptName',
        type: 'text',
        message: 'Please enter the department you would like to add:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the department you would like to add:');
                    return false;
                }
            },           
        }     
    ])
    .then(({deptName}) => {
    const sql = `INSERT INTO department(name) VALUES(?)ON DUPLICATE KEY UPDATE name=?;`;  
    // If Department name does NOT exist, insert Department name into Department Table 
    const params = [deptName, deptName];
    db.query(sql,params, (err,response) => {
        if (err) {
            console.log(err);
            }
            console.log(chalk.white.bold(`====================================================================================`));
            console.log(chalk.white.bold(                ` Department Successfully Added `));
            console.log(chalk.white.bold(`====================================================================================`));
            // View Department Table
            viewAllDepts();
        });
    });
}

// Add Role
function addRole() {
    // Call chooseDept with action of linkrole to get Department name to which the role belongs
    chooseDept('linkrole');  
}
// Add new Role data into Role Table and link to Department ID
function addDeptToRole(depId)
{ 
    // Require user to enter valid Role Title and Role Salary for new Role to be added    
    inquirer
    .prompt([
    {       
        name: 'roleTitle',
        type: 'text',
        message: 'Please enter the Role Title you would like to add:',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter the Role Title you would like to add:');
                    return false;
                }
            }
        },    
        {    
            name: 'roleSalary',
            type: 'number',
            message: 'Please enter the Role Salary:',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter the Role Salary:');
                    return false;
                }
            }
        }     
    ])
    // Insert data collected into Role Table and link it to corresponding Department 
    .then((answer) => {
    const sql = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
    const params = [answer.roleTitle,answer.roleSalary,depId];
    db.query(sql,params,(err,response)=>{
        if (err) {
            console.log(err);
            }
            console.log(chalk.white.bold(`====================================================================================`));
            console.log(chalk.white.bold(                ` Role Successfully Added `));
            console.log(chalk.white.bold(`====================================================================================`));
            // View updated Role Table
            viewAllRoles();  
        });
    });
}

// Add Employee
function addEmployee() {
    // Ask user to enter Employee's first and last name 
    inquirer
    .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "Please enter employee's first name:",
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log('Please enter a valid first name:');
                    return false;
                    }
            }
        },
        {
            name: 'lastName',  
            type: 'input',
            message: "Please enter employee's last name:",
            validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log('Please enter a valid last name');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
        // Add first and last name to an array
        const empArr = [answer.firstName, answer.lastName]
        // Select Employee Role from Role Table
        const sql = `SELECT role.id, role.title FROM role`;   
        db.query(sql, (error, response) => {
            if (error) throw error; 
            const roleTitleArr= response.map(({ id, title }) => ({ name: title, value: id }));
            // Ask user to select Role for new Employee 
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "Please select the employee's role:",
                    choices: roleTitleArr
                }
            ])
                .then(roleChoice => {
                const role = roleChoice.role;
                // Add selected Role array
                empArr.push(role);
                // Select new employee's Manager 
                const managerSql =  `SELECT * FROM employee`; 
                db.query(managerSql, (error, response) => {
                    if (error) throw error;
                    // Fetch all names in Manager array 
                    const managerArr = response.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Please select the employee's manager:",
                            choices: managerArr
                        }
                    ])
                        .then(managerChoice => {
                            // Choose Manager
                            const manager = managerChoice.manager;  
                            console.log(manager);
                            empArr.push(manager); 
                            // Insert data into table 
                            console.log (empArr);
                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                            db.query(sql, empArr, (error) => {
                            if (error) throw error;
                            console.log("Employee has been successfully added!")
                            // View Employee Table
                            viewAllEmployees(); 
                        });
                    });
                });
            });
        });
    });
};

init();

