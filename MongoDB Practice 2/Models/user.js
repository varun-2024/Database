const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  address: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

main()
  .then(() => console.log("Connection Sucessful"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const User = mongoose.model("User", userSchema);

const addUser = async () => {
  let user1 = new User({
    username: "Sham Pyare",
    address: [
      {
        location: "221B Baker Street",
        city: "London",
      },
    ],
  });
  user1.address.push({ location: "Carnaby Street", city: "London" });
  let result = await user1.save();
  console.log(result);
  console.log("user1 Saved");
};

addUser();
