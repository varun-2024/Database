const mongoose = require("mongoose");
main()
  .then(() => console.log("Connection Sucessful"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});
const postSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
  let user1 = new User({
    username: "rahul Kumar",
    email: "rahul@gmail.com",
  });
  let post1 = new Post({
    content: "Hello World",
    likes: 7,
  });
  post1.user = user1;
  await user1.save();
  await post1.save();
};
//addData();

(async () => {
  let result = await Post.find({}).populate("user");
  console.log(result);
})();
