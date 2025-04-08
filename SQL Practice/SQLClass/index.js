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
// Connect to the database & Insert Data
let q =
  "Insert into user (id, username, email, password) values (? ,? , ? , ?)";
let user = ["123", "new_user123", "newuser@gmail.com", "newuser123"];
try {
  connection.query(q, user, (err, results, fields) => {
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

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

//Get Random User Data
//console.log(getRandomUser());
