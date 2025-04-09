// CJS Faker
const { faker } = require("@faker-js/faker");

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

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

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
let q = "Insert into user (id, username, email, password) values ?";
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
});
