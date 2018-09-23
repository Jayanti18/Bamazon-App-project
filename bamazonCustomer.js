var mysql = require("mysql");
var inquirer = require("inquirer");

// connection to mysql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displaySale();
});




function displaySale() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + "  " + "Product Name: " + res[i].product_name + "  " + "Price: " + res[i].price);
    }
    buySaleItem();
  });

  // function to prompt user for id and quantity to buy.**********
  function buySaleItem() {
    inquirer
      .prompt([
        {
          name: "UserItemId",
          type: "input",
          message: "Enter the item ID you would like to buy: ",
        },
        {
          name: "UserQty",
          type: "input",
          message: "Enter the quantity: ",
        }

      ])
      .then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?",
          { item_id: answer.UserItemId }, function (err, result) {
            if (result[0].stock_quantity >= answer.UserQty) {
              connection.query("UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: result[0].stock_quantity - answer.UserQty
                  },
                  {
                    item_id: answer.UserItemId
                  }
                ],
                function (err, updateResult) {
                  console.log("Your total price is: " + answer.UserQty * result[0].price);
                } 
              )

            } else {
              console.log("Insufficient Quantity!");
            }
          }
        )

      })

  };
}