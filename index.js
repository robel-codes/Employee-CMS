const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./config/connection');


db.connect(err => {
    if (err) throw err;
    console.log('Connected as id' + db.threadId + '\n');
    promptUser();
});

const questions = [
    {
        type: "list",
        name: "userChoice",
        message: "please select what you want to do with this Employee Content managment system?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Roles", "Exit Program",]
    }
];

// function to prompt user repeatedly 
const comfirmPrompt = () => {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Is there anything else you would like to do in the Content managment system?',
        name: 'comfirmPrompt',
        default: false
    }]).then(({comfirmPrompt}) => {
        if(comfirmPrompt) {
            return promptUser();
        } db.end();
    })
    .catch(err => console.log(err));
}

// function to switch between actions on the users choice
function action(choice) {
    switch (choice) {
        case "View All Departments":
            viewDepartments();
            break;
          
        case "View All Roles":
            viewRoles();
            break;
            
        case "View All Employees":
            viewEmployees();
            break;
            
        case "Add a Department":
            addDepartment();
            break;

        case "Add a Role":
            addRole();
            break;

        case "Add an Employee":
            addEmployee();
            break;

        case "Update Employee Roles":
            updateERoles();
            break;

        default:
            console.log("Exit Option has been selected.");
            db.end();
            break;
    }
};

function promptUser() {
    inquirer
        .prompt(questions)
        .then(answers => {
            action(answers.userChoice);
        })
        .catch(error => console.log(error));
};

//function to query and display all departments
function viewDepartments() {
    db.query(
        `SELECT * FROM department`,
        function (err, results) {
            if (err) throw err;
            console.table('Departments', results);
            comfirmPrompt();
        }
    );
};

//function to query and display all roles
function viewRoles() {
    db.query(
        'SELECT title, salary, department_id, department.name as dept_name from role inner join department on role.department_id=department.id',
        function (err, results) {
            if (err) throw err;
            console.table(results);
            comfirmPrompt();
        }
    );
};

//function to query and display all employees
function viewEmployees() {
    db.query(
        'Select first_name, last_name, role_id as role, manager_id as manager,role.salary, role.title as role from employee inner join role on employee.role_id=role.id',
        function (err, results) {
            if (err) throw err;
            console.table(results);
            comfirmPrompt();
        }
    );
};

//fuction to add new department to the database
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDeptName",
            message: "Please enter then name for the new Department:"
        }
    ])
    .then(answers => {
        db.query(
            `INSERT INTO department SET ?`,
            {
                name: answers.newDeptName
            },
            function (err, results) {
                if (err) throw err;
                console.log('\x1b[33m%s\x1b[0m', 'New department Added to the database!\n');
                comfirmPrompt();
            }
        );        
    });
};

// fuction to add new role to the database
function addRole() {
    db.query(
        `SELECT * FROM department`,
        function (err, results) {
            if (err) throw err;

            let departmentList = results.map(department => ({
                name: department.name, value: department.id
            }));

            inquirer.prompt([
                {
                    type: "input",
                    name: "newRoleName",
                    message: "Please enter the name of the new Role:"
                },
                {
                    type: "input",
                    name: "newRoleSalary",
                    message: "Please enter the new salary for the new Role:",
                },
                {
                    type: "list",
                    name: "newRoleDept",
                    message: "please select the new Role's Department.",
                    choices: departmentList
                }
            ])
                .then(answers => {
                    db.query(
                        `INSERT INTO role SET ?`,
                        {
                            title: answers.newRoleName,
                            salary: answers.newRoleSalary,
                            department_id: answers.newRoleDept
                        },
                        function (err, results) {
                            if (err) throw err;
                            console.log('\x1b[33m%s\x1b[0m' ,'New Role Added to the database\n');
                            comfirmPrompt();
                        }
                    );
                })
        }
    );
};

//function to add new employee to the database
function addEmployee() {
    db.query(
        `SELECT CONCAT(employee.first_name, " ",employee.last_name) AS full_name FROM employee`,
        function (err, results) {
            if(err) throw err;
            let managerList = results.map(manager => ({
                name: manager.full_name, value: manager.id
            }));

            db.query(
                `SELECT * FROM role`,
                function (err, results) {
                    if (err) throw err;

                    let roleList = results.map(role => ({
                        name: role.title, value: role.id
                    }));

                    inquirer.prompt([
                        {
                            type: "input",
                            name: "empFistName",
                            message: "Please enter Empolyee's first name here:"
                        },
                        {
                            type: "input",
                            name: "empLastName",
                            message: "Please enter the Employee's last name here:"
                        },
                        {
                            type: "list",
                            name: "empRole",
                            message: "Please select the employee's new role.",
                            choices: roleList
                        },
                        {
                            type: "list",
                            name: "empManager",
                            message: "Please select the new Employee's Manager Name.",
                            choices: managerList
                        }
                    ])
                        .then(answers => {
                            db.query(
                                `INSERT INTO employee SET ?`,
                                {
                                    first_name: answers.empFistName,
                                    last_name: answers.empLastName,
                                    role_id: answers.empRole,
                                    manager_id: answers.empManager
                                },
                                function (err, results) {
                                    if (err) throw err;
                                    console.log('\x1b[33m%s\x1b[0m', 'New Employee Added Successfully!\n');
                                    comfirmPrompt();
                                }
                            );
                        })
                }
            );
        }
    );
};

//function to update the role of existing employee
const updateERoles = () => {
    db.query(
        'SELECT CONCAT(employee.first_name, " ",employee.last_name) AS full_name, employee.id as empl_id, role.* FROM employee RIGHT JOIN role on employee.role_id = role.id',
        function (err, res) {
            if (err) throw err;
            let employeeList = res.map(employee => ({
                full_name: employee.full_name,
                id: employee.empl_id,
                title: employee.title,
                value: [employee.full_name, employee.empl_id,employee.title]
            }))
            
            let roleList = res.map(role => ({
                title: role.title,
                id: role.id,
        
                value: [role.title, role.id]
            }));

            inquirer.prompt([{
                type: 'list',
                name: 'employee',
                choices: employeeList,
                message: 'Which employee would you like to edit?'
            },
            {
                type: 'list',
                name: 'newRole',
                choices: roleList,
                message: 'What role do you want to give to the employee?'
            }
            ])
                .then((answer) => {
                    let newID = answer.employee[1];
                    let newRoleID = answer.newRole[1];
                    
                    db.query(`UPDATE employee SET role_id=${newRoleID} WHERE id=${newID};`,
                        function (err, res) {
                            if (err) {
                                throw err
                            }
                            console.log('\x1b[33m%s\x1b[0m', 'The role of '+ answer.employee[0] + ' is updated to '  + answer.newRole[0] + '\n');
                            comfirmPrompt();
                        })
                }
                
                )
        }
    )
};

