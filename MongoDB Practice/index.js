const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("Connected to MongoDB\n");
    console.log(res);
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/testdb");
}

const db = mongoose.connection;
