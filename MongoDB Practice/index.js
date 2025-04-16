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

// Require method override
const methodOverride = require("method-override");

// EJS Views Engine
app.set("view engine", "ejs");

// Views Path
app.set("views", path.join(__dirname, "views"));

// Static Files Path
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up default mongoose connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
  .then((res) => {
    console.log("Connected to MongoDB\n");
    console.log(res, "Here");
  })
  .catch((err) => {
    console.log(err);
  });

//New Chat1
/* const chat1 = new Chat({
  from: "John",
  to: "Doe",
  message: "Hello Doe! How are you doing?",
  created_at: new Date(),
}); */

// Save Chat1
/* chat1
  .save()
  .then((res) => {
    console.log("Chat saved successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error saving chat:", err);
  }); */

//Get Request Root
app.get("/", (req, res) => {
  res.send("Root is working");
});

// Get Request for Chats
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    console.log(chats);
    //res.send("Working fine");
    //res.render("index.ejs", { chats: chats });
    //res.sendFile(path.join(__dirname, "views", "index.ejs"));
    res.render("index.ejs", { chats });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving chats");
  }
});

//Get Request for New Chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Post Requesr New Chat
app.post("/chats", async (req, res) => {
  let { from, to, message } = req.body;
  let created_at = new Date();
  let chat = new Chat({
    from,
    to,
    message,
    created_at,
  });
  chat
    .save()
    .then((res) => console.log("Chat Saved Successfully", res))
    .catch((err) => console.log("Error Saving Chat", err));
  res.redirect("/chats");
  /*   try {
    await chat.save();
    console.log("Chat saved successfully");
    res.redirect("/chats");
  } catch (err) {
    console.log("Error saving chat:", err);
    res.status(500).send("Error saving chat");
  } */
});

// View Post
app.get("/chats/:id/view", async (req, res) => {
  try {
    let chat = await Chat.findById(req.params.id);
    console.log(chat);
    res.render("view.ejs", { chat });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving chat");
  }
});

// Get Request for Edit Chat
app.get("/chats/:id/edit", async (req, res) => {
  try {
    let chat = await Chat.findById(req.params.id);
    console.log(chat);
    res.render("edit.ejs", { chat });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving chat");
  }
});

// Edit Chat
app.put("/chats/:id", async (req, res) => {
  let { from, to, newMessage } = req.body;
  let updated_at = new Date();
  let { id } = req.params;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage, updated_at },
    { new: true, runValidators: true }
  );
});

// Clear Chats
app.get("/chats/clear", async (req, res) => {
  try {
    await Chat.deleteMany({});
    console.log("All chats deleted successfully");
    res.redirect("/chats");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting chats");
  }
});

// Server Listning
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
