const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Peaches41599!",
  database: "employeedb",
});
connection.connect((err) => {
    if (err) throw err;
    mainMenu();
  });

const mainMenu = () => {
  inquirer
    .prompt({
      name: "commands",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees","View All Employees By Department","View All Employees By Manager","Add Employee", "Update Employee Role"]
    })
    .then((answer) => {
      mainMenu();
    });
};
