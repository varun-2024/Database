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

/* // Saving User1 to the database
User1.save()
  .then((res) => console.log("User saved to database\n", res))
  .catch((err) => console.log(err));

User.insertMany([
  { name: "Jane Smith", email: "jane.smith@example.com", age: 28 },
  { name: "Alice Johnson", email: "alice.johnson@example.com", age: 25 },
  { name: "Bob Brown", email: "bob.brown@example.com", age: 35 },
])
  .then((res) => console.log("Users saved to database\n", res))
  .catch((err) => console.log(err)); */

//Finding a user in the database
/* User.find({ age: { $gt: 31 } })
  .then((res) => {
    console.log("Users found in database\n", res[0].name);
  })
  .catch((err) => console.log(err));
 */

//Fine one and update a user in the database
/* User.findOneAndUpdate({ name: "John Doe" }, { age: 35 }, { new: true })
  .then((res) => console.log("User updated in database\n", res))
  .catch((err) => console.log(err)); */

//Update One User in the database
/* User.updateOne({ name: "Bob Brown" }, { age: 40 })
  .then((res) => console.log("User updated in database\n", res))
  .catch((err) => console.log(err)); */

// Updating multiple users in the database
/* User.updateMany({ age: { $lte: 30 } }, { $set: { age: 40 } })
  .then((res) => console.log("User updated in database\n", res))
  .catch((err) => console.log(err)); */

//Delete a user in the database
/* User.deleteOne({ name: "John Doe" })
  .then((res) => console.log("User deleted from database\n", res))
  .catch((err) => console.log(err)); */

//Deleting multiple users in the database
/* User.deleteMany({ name: "John Doe" })
  .then((res) => console.log("User deleted from database\n", res))
  .catch((err) => console.log(err)); */

//Deleting a user by ID in the database
/* User.findByIdAndDelete("67fd1cd7ecd5b720afc37397")
  .then((res) => console.log("User deleted from database\n", res))
  .catch((err) => console.log(err)); */

// Find one and Delete a user in the database
/* User.findOneAndDelete({ name: "Bob Brown" })
  .then((res) => console.log("User deleted from database\n", res))
  .catch((err) => console.log(err)); */

/* const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Database connection established.");
  mongoose.connection.close();
}); */

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
});

const bookSchema2 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 1"], // Custom error message
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["fiction", "non-fiction", "science", "history"],
  },
  genre: [String],
});
const Book = mongoose.model("Book", bookSchema2);
let Book1 = new Book({
  title: "Harry Potter",
  author: "J.K. Rowling",
  price: 29.99,
  discount: 5,
  category: "fiction",
  genre: ["fantasy", "adventure"],
  // If discount: undefined, // This will set the discount to 0
});
Book1.save()
  .then((res) => console.log("Book saved to database\n", res))
  .catch((err) => console.log(err));
Book.findByIdAndUpdate(
  "64f1c8e4b3d2f5a0c8e4b3d2",
  { price: -19.99 },
  { runValidators: true }
)
  .then((res) => {
    console.log("Book updated in database\n", res.price);
  })
  .catch((err) => console.log(err.errors.price.properties.message)); // Custom Error in Price
