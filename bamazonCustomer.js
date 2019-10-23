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
    promptCustomer(res);
  });
};

// create inquirer prompt for user input and loop through data
var promptCustomer = function(res) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What would you like to purchase? [Quit with Q]"
      }
    ])
    .then(function(answer) {
      var correct = false;
      if (answer.choice.toUpperCase() == "Q") {
        process.exit();
      }
      for (var i = 0; i < res.length; i++) {
        correct = true;
        var product = answer.choice;
        var id = i;
        // prompt to ask the user how many items they would like to buy & checking if it is a number
        inquirer
          .prompt({
            type: "input",
            name: "quant",
            message: "How many would you like to buy?",
            validate: function(value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
            // number confirmed checking against stock quantities
          })
          .then(function(answer) {
            if (res[id].stock_quantity - answer.quant > 0) {
              connection.query(
                "UPDATE products SET stock_quantity='" +
                  (res[id].stock_quantity - answer.quant) +
                  "' WHERE product_name= '" +
                  product +
                  "'",
                function(err, res2) {
                  console.log("Product Bought!");
                  makeTable();
                }
              );
            } else {
              console.log("Not a valid selection!");
              promptCustomer(res);
            }
          });
      }
      if (i == res.length && correct == false) {
        console.log("Not a valid selection!");
        promptCustomer(res);
      }
    });
};
