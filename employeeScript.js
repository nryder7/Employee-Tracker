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

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_tracker_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  inquirer
    .prompt(questions)
    .then(function (answers) {
      console.log(answers.action);
      //   function (err) {
      //     if (err) {
      //         return console.log(err);
      //     }
      //     console.log("Success!");
      // };
    });
  //afterConnection();
});

// function afterConnection() {
//   connection.query("SELECT * FROM employee", function(err, res) {
//     if (err) throw err;
//     console.table(res);
//     connection.end();
//   });
// }



