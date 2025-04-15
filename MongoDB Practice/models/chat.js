// Chat Schema
const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    maxLength: 500,
  },
  created_at: {
    type: Date,
    required: true,
  },
});
// Chat Model
const Chat = mongoose.model("Chat", chatSchema);
// Export Chat Model
module.exports = Chat;
