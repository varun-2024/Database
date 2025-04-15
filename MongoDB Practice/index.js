// Require Express
const express = require("express");

//Express App
const app = express();

// Port
const port = 8080;

// Require Mongoose
const mongoose = require("mongoose");

// Require path
const path = require("path");

//Require EJs
const ejs = require("ejs");

// Require Chat Model
const Chat = require("./models/chat");

// EJS Views Engine
app.set("view engine", "ejs");

// Views Path
app.set("views", path.join(__dirname, "views"));

// Set up default mongoose connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
  .then((res) => {
    console.log("Connected to MongoDB\n");
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//New Chat1
const chat1 = new Chat({
  from: "John",
  to: "Doe",
  message: "Hello Doe! How are you doing?",
  created_at: new Date(),
});

// Save Chat1
chat1
  .save()
  .then((res) => {
    console.log("Chat saved successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error saving chat:", err);
  });

//Get Request Root
app.get("/", (req, res) => {
  res.send("Root is working");
});

// Server Listning
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
