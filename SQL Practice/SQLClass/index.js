// CJS Faker
const { faker } = require("@faker-js/faker");
// Require Express
const express = require("express");
const app = express();
const port = 8080;
//Require Path
const path = require("path");
// Require Method Override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Require Data Parser
app.use(express.urlencoded({ extended: true }));

// Require EJS
app.set("view engine", "ejs");
// Set the views directory to the current directory
app.set("views", path.join(__dirname, "views"));
// Set the public directory to the current directory
//app.set("public", path.join(__dirname, "public"));

//app.use(express.static(path.join(__dirname, "public")));

// Require UUID
const { v4: uuidv4 } = require("uuid");

// Get the client
const mysql = require("mysql2");
// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Cocacola123@",
});

// Return Array in Faker Function  to use in the query to insert multiple data and remove key value pairs
/* let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}; */

/* let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}; */

//Get Random User Data
//console.log(getRandomUser());

// Connect to the database & Insert Data
/* Using ? four times when inserting single Array
let q =
  "Insert into user (id, username, email, password) values (? ,? , ? , ?)";
  let user = ["123", "new_user123", "newuser@gmail.com", "newuser123"]; */

//let q = "Insert into user (id, username, email, password) values ?";

/* To Insert Multiple Users, use Array of Arrays and use only one ? in the query
let user = [
  ["124", "new_user124", "newuser2@gmail.com", "newuser124"],
  ["125", "new_user125", "newuser3@gmail.com", "newuser125"],
  ["126", "new_user126", "newuser4@gmail.com", "newuser126"],
]; */

/* try {
  connection.query(q, [user], (err, results, fields) => {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
  });
} catch (err) {
  console.log(err);
} */
// Query to Insert Multiple Users using Faker
/* let q = "Insert into user (id, username, email, password) values ?";
// To make data variable an Array of Arrays of 100  users using for loop
let data = [];
for (let i = 0; i < 100; i++) {
  data.push(getRandomUser());
}
// SQL Connection and Insert Data
try {
  connection.query(q, [data], (err, results, fields) => {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
  });
} catch (err) {
  console.log(err);
}

// Close the connection
connection.end((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection closed.");
  }
}); */

// Get Request
let resultCount = 0;
// Home Route
app.get("/", (req, res) => {
  q = `Select count(*) from user`;
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      console.log(results[0]["count(*)"]); // results contains rows returned by server
      resultCount = results[0]["count(*)"];
      res.render("home.ejs", { resultCount });
      //res.send(`Total users: ${resultCount}`);
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Get Request");
  }
});
// Show User Route
app.get("/user", (req, res) => {
  let q = `Select * from user`;
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let users = results;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Get Request");
  }
});

// Edit User Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `Select * from user where id = ?`;
  try {
    connection.query(q, [id], (err, results) => {
      if (err) throw err;
      let user = results[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Get Request");
  }
});

//Patch Request to Update User
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: newUser, email: formEmail, password: formPass } = req.body;
  let q = `Select * From user Where id = '${id}'`;
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let user = results[0];
      if (formPass !== user.password) {
        console.log("Password is incorrect");
        res.render("wrongpass.ejs");
      } else {
        let q2 = `Update user Set username = '${newUser}', email = '${formEmail}' Where id = '${id}'`;
        connection.query(q2, (err, results) => {
          if (err) throw err;
          console.log("User name and email updated successfully");
          res.render("editsuccess.ejs");
        });
      }

      console.log(user);
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Patch Request");
  }
});

// Add User Route Get Request

app.get("/user/adduser", (req, res) => {
  res.render("adduser.ejs", { user: {} });
});
// Post Request to Add User
app.post("/user/adduser", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;
  let q3 = `Insert into user (id, username, email, password) values ('${id}','${username}','${email}','${password}')`;
  try {
    connection.query(q3, (err, results) => {
      if (err) throw err;
      console.log("User added successfully");
      res.render("success.ejs");
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Post Request");
  }
});

// Delete User GET Route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `Select * from user where id = ?`;
  try {
    connection.query(q, [id], (err, results) => {
      if (err) throw err;
      let user = results[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Get Request");
  }
});
// Delete User POST Route
app.delete("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let { username: formUser, email: formEmail, password: formPass } = req.body;
  let q4 = `Select * from user where id = ?`;
  try {
    connection.query(q4, [id], (err, results) => {
      if (err) throw err;
      let user = results[0];
      if (formPass !== user.password) {
        console.log("Password is incorrect");
        res.render("wrongpass.ejs");
      } else {
        let deleteQuery = `Delete from user where id = ? And username = ? And email = ? And password = ?`;
        connection.query(
          deleteQuery,
          [id, formUser, formEmail, formPass],
          (err, results) => {
            if (err) throw err;
            console.log("User deleted successfully");
            res.render("deletesuccess.ejs");
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    console.log("Error in Delete Request");
  }
});

// Server Listening on Port
app.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
