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
        "Update Employee Roles",
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
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Roles":
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
    console.table(res);
    mainMenu();
  });
};

const allRole = () => {
  const query =
    "SELECT department_id, title, salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const allDepartment = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What is the name of the new Department",
    })
    .then((answer) => {
      const query = "INSERT INTO department SET name = ?";
      connection.query(query, [answer.action], (err, res) => {
        if (err) throw err;
        console.log(res);
        allDepartment();
      });
    });
};

const addRole = () => {
  const query = "SELECT * FROM department";
  connection.query(query, [], (err, res) => {
    if (err) throw err;
    const choiceNames = [];
    for (let i = 0; i < res.length; i++) {
      const object = {
        name: res[i].name,
        value: res[i].id,
      };
      choiceNames.push(object);
    }
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the new Role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the new Role?",
        },
        {
          name: "department_id",
          type: "list",
          message: "What department does this role fall under?",
          choices: choiceNames,
        },
      ])
      .then((answer) => {
        console.log(answer);
        const query = "INSERT INTO role SET ?";
        connection.query(query, answer, (err, res) => {
          if (err) throw err;
          console.log(res);
          allRole();
        });
      });
  });
};

const addEmployee = () => {
  const query = "SELECT * FROM department";
  connection.query(query, [], (err, res) => {
    if (err) throw err;
    const choiceNames = [];
    for (let i = 0; i < res.length; i++) {
      const object = {
        name: res[i].name,
        value: res[i].id,
      };
      choiceNames.push(object);
    }
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the name of the new Role?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the salary of the new Role?",
        },
        {
          name: "role_id",
          type: "list",
          message: "What role does your employee have?",
          choices: choiceNames,
        },
      ])
      .then((answer) => {
        console.log(answer);
        const query = "INSERT INTO role SET ?";
        connection.query(query, answer, (err, res) => {
          if (err) throw err;
          console.log(res);
          allRole();
        });
      });
  });
};

const updateRole = () => {

}