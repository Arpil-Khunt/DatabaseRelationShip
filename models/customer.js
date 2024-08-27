const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("connection successful!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//customerSchema
const orderSchema = new Schema({
  item: String,
  price: Number,
});
const Order = mongoose.model("Order", orderSchema);

const customerSchema = new Schema({
  name: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const Customer = mongoose.model("Customer", customerSchema);

//one to many cardinality in mongoDB
const addCustomer = async () => {
  const cust1 = new Customer({
    name: "Rahul Kumar",
  });
  let order1 = await Order.findOne({ item: "chips" });
  let order2 = await Order.findOne({ item: "chocolate" });
  cust1.orders.push(order1);
  cust1.orders.push(order2);
  let result = await cust1.save();
  console.log(result);
};
//addCustomer();

//find the customer
const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};
findCustomer();
// const addOrder = async () => {
//   let result = await Order.insertMany([
//     { item: "samosa", price: 12 },
//     { item: "chips", price: 10 },
//     { item: "chocolate", price: 40 },
//   ]);
//   console.log(result);
// };

// addOrder();
