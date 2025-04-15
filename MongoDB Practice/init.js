// Require Mongoose
const mongoose = require("mongoose");

// Require Chat Model
const Chat = require("./models/chat");

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

//New Chat
let chats = [
  {
    from: "John",
    to: "Doe",
    message: "Hello Doe! How are you doing?",
    created_at: new Date(),
  },
  {
    from: "Doe",
    to: "John",
    message: "Hello John! I am doing well. How about you?",
    created_at: new Date(),
  },
  {
    from: "John",
    to: "Doe",
    message: "I am doing great! Thanks for asking.",
    created_at: new Date(),
  },
  {
    from: "Doe",
    to: "John",
    message: "What are you up to these days?",
    created_at: new Date(),
  },
  {
    from: "John",
    to: "Doe",
    message: "Just working on some projects. You?",
    created_at: new Date(),
  },
  {
    from: "Doe",
    to: "John",
    message: "Same here! Let's catch up soon.",
    created_at: new Date(),
  },
];
mongoose.connection.once("open", () => {
  Chat.insertMany(chats)
    .then((res) => {
      console.log("Chat saved successfully");
      console.log(res);
    })
    .catch((err) => {
      console.log("Error saving chat:", err);
    });
});
