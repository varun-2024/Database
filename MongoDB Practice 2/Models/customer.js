const mongoose = require("mongoose");
main()
  .then(() => console.log("Connection Sucessful"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
});
const customerSchema = new mongoose.Schema({
  name: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

/* customerSchema.pre("findOneAndDelete", async () => {
  console.log("Pre Middleware");
}); */
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length > 0) {
    let result = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log("Orders Deleted: ", result, "Oders Deleted Finish");
  }
  console.log("Post Middleware", customer, " Post Finish");
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

/* const addOrders = async () => {
  const result = await Order.insertMany([
    { item: "Samosa", price: 12 },
    { item: "Chips", price: 10 },
    { item: "Chocolate", price: 40 },
  ]);
  console.log(result);
}; */
//addOrders();

/* const addCustomer = async () => {
  let cust1 = new Customer({
    name: "Rahul",
  });
  let order1 = await Order.findOne({ item: "Chips" });
  let order2 = await Order.findOne({ item: "Chocolate" });
  cust1.orders.push(order1);
  cust1.orders.push(order2);
  let result = await cust1.save();
  console.log(result);
}; */
//addCustomer();

const addCustomer = async () => {
  let newCust = new Customer({
    name: "Karan Arjun",
  });
  let newOrder = new Order({
    item: "Pizza",
    price: 550,
  });
  newCust.orders.push(newOrder);
  let cust = await newCust.save();
  let ord = await newOrder.save();
  console.log("Added New Customer and Order", cust, ord);
};
//addCustomer();

const delCustomer = async () => {
  let data = await Customer.findByIdAndDelete("68121c024c516fc480393a3c");
  console.log("Deleted :", data, "Delete Finish");
};
delCustomer();

const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};
findCustomer();
