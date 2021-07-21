const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Managers",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.commands) {
        case "View All Employees":
          allEmployee();
          break;
        case "View All Roles":
          allRole();
          break;
        case "View All Departments":
          allDepartment();
          break;
        case "Add Employee":
          console.log("Come Back Soon!");
          break;
        case "Add Role":
          console.log("Come Back Soon!");
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Managers":
          console.log("Come Back Soon!");
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

const allEmployee = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ id, first_name, last_name }) =>
      console.table(`${id}. ${first_name} ${last_name}`)
    );
  });
};

const allRole = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ id, title, salary }) =>
      console.log(`${id}. ${title} || $${salary}`)
    );
  });
};

const allDepartment = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ name }) => console.log(`${name}`));
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'input',
      message: 'What is the name of the new Department',
    })
    .then((answer) => {
      const query = "INSERT INTO department SET name = ?";
      connection.query(query,[answer.action], (err, res) => {
        if (err) throw err;
       console.log(res)
      });
      
      console.log("Standby");
      // INSERT INTO department SET name = "Engineering";
     
    });
};

