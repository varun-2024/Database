// Require Mongoose
const mongoose = require("mongoose");
// Set up default mongoose connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/user");
}
main()
  .then((res) => {
    console.log("Connected to MongoDB\n");
    console.log(res);
  })
  .catch((err) => console.log(err));
// Create a MongoDB schema in Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
// Create a model based on the schema
const User = mongoose.model("User", userSchema);
const Employee = mongoose.model("Employee", userSchema);
// Create a new user instance
User1 = new User({
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
});
// Saving User1 to the database
User1.save()
  .then((res) => console.log("User saved to database\n", res))
  .catch((err) => console.log(err));

User.insertMany([
  { name: "Jane Smith", email: "jane.smith@example.com", age: 28 },
  { name: "Alice Johnson", email: "alice.johnson@example.com", age: 25 },
  { name: "Bob Brown", email: "bob.brown@example.com", age: 35 },
])
  .then((res) => console.log("Users saved to database\n", res))
  .catch((err) => console.log(err));

/* const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Database connection established.");
  mongoose.connection.close();
}); */
