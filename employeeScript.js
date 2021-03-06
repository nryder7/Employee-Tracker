var mysql = require("mysql");
var inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
    name: "action"
  }
]
const departmentSelection = [
  {
    type: "list",
    message: "Which department's employees do you want to view?",
    choices: [1, 2, 3],
    name: "departmentNumber"
  }
]
const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employees first name?",
    name: "firstName"
  },
  {
    type: "input",
    message: "What is the employees last name?",
    name: "lastName"
  },
  {
    type: "list",
    message: "Select role ID",
    choices: [1, 2, 3],
    name: "roleID"
  },
  {
    type: "list",
    message: "Select manager ID",
    choices: [1, 2, "None"],
    name: "managerID"
  }
]

const removeEmployeeQuestions = [
  {
    type: "input",
    message: "What is the ID number of the employee you want to delete?",
    name: "employeeID"
  }
]
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_tracker_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  initialPrompt();
});

function initialPrompt() {
  inquirer
    .prompt(questions)
    .then(function (answers) {
      console.log(answers.action);

      if (answers.action === "View All Employees") {
        viewAllEmployees();
      }
      else if (answers.action === "View All Employees By Department") {
        viewAllEmployeesByDepartment();
      }
      else if (answers.action === "View All Employees By Manager") {
        console.log("View All Employees By Manager Now")
        viewAllEmployeesByManager();
      }
      else if (answers.action === "Add Employee") {
        addEmployee();
      }
      else if (answers.action === "Remove Employee") {
        removeEmployee();
      }
      else if (answers.action === "Update Employee Role") {
        console.log("Update Employee Role Now")
      }
      else {
        console.log("Update Employee Manager Now")
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });

}

function viewAllEmployeesByDepartment() {
  inquirer
    .prompt(departmentSelection)
    .then(function (answers) {

      connection.query("SELECT first_name, last_name, role_id, department_id FROM employee RIGHT JOIN role ON role.id = employee.role_id", function (err, res) {
        var responseDepartments = []
        for (var i = 0; i < res.length; i++) {
          if (res[i].department_id === answers.departmentNumber) {
            responseDepartments.push(res[i]);
          }
        }
        console.table(responseDepartments);
        initialPrompt();
      });
    })
}

function viewAllEmployeesByManager() {
  // var responseManager = []
  //   for (var j = 0; j < res.length; j++) {
  //   if (res[j].manager_id === answers.departmentNumber) {
  //       responseDepartments.push(res[i]);
  //   }   
  // }
  // console.table(responseDepartments);
  // connection.query("SELECT * FROM role", function (err, res) {
  //   if (err) throw err;
  //   console.table(res);
  console.log("--------------------------------------")
  console.log("Feature not yet available")
  console.log("--------------------------------------")
  initialPrompt();
  // });
}

function addEmployee() {
  inquirer
    .prompt(addEmployeeQuestions)
    .then(function (answers) {

      var firstNameResponse = answers.firstName.trim();
      if (firstNameResponse === "") {
        console.log("first name is required")
        answers.firstName = null
      }

      var lastNameResponse = answers.lastName.trim();
      if (lastNameResponse === "") {
        console.log("last name is required")
        answers.lastName = null
      }

      var ManagerIDConvert = answers.managerID
      if (ManagerIDConvert === "None") {
        ManagerIDConvert = null
      }

      console.log("Adding Employee\n");
      var query = connection.query(
        "INSERT INTO employee SET ? ",
        [
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleID,
            manager_id: ManagerIDConvert
          }
        ],
        function (err, res) {
          if (err) throw err;
          initialPrompt();
        })
    });
};


function removeEmployee() {
  inquirer
    .prompt(removeEmployeeQuestions)
    .then(function (answers) {
      console.log("Removing employee\n");
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          id: answers.employeeID
        },
        function (err, res) {
          if (err) throw err;
          // console.log(res.affectedRows + " employee deleted!\n");
          // viewAllEmployees();
          initialPrompt();
        }
      );
    });
}

