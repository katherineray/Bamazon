var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "SQLcli2019!!1",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connection succesful!");
  makeTable();
});

// create table function to pull data from database and print to screen
var makeTable = function() {
  connection.query("SELECT * FROM bamazon_db.products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].itemid +
          " || " +
          res[i].product_name +
          " || " +
          res[i].department_name +
          " || " +
          res[i].price +
          " || " +
          res[i].stock_quantity +
          "\n"
      );
    }
  });
};
