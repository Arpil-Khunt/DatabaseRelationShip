const mongoose = require("mongoose");
const { Schema } = mongoose;

//it's called hoisting, means you can access main() function before it's initialization
main()
  .then(() => console.log("connection successful!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//customer schema
const customerSchema = new Schema({
  name: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

//pre and post middleware for mongoose, see in documentation of mongoose mongoose.js
//findOneAndDelete is for findByIdAndDelete means if this query is executed before it check is there any findOneAndDelete middleWare is available if yes then execute first them and after execute this findByIdAndDelete
customerSchema.pre("findOneAndDelete", async () => {
  console.log("PRE Middleware");
});
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let result = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(result);
  }
});

//customerSchema
const orderSchema = new Schema({
  item: String,
  price: Number,
});
const Order = mongoose.model("Order", orderSchema);

const Customer = mongoose.model("Customer", customerSchema);

//one to many cardinality in mongoDB ..... Approach-2
const addCustomer = async () => {
  const cust1 = new Customer({
    name: "Nishan Khunt",
  });
  let order1 = await Order.findOne({ item: "burger" });
  let order2 = await Order.findOne({ item: "momos" });
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
//findCustomer();

//add new Customer
const addNewCustomer = async () => {
  let newCustomer = new Customer({
    name: "Karan Arjun",
  });
  let newOrder = new Order({
    item: "pizza",
    price: 250,
  });
  newCustomer.orders.push(newOrder);
  let order = await newOrder.save();
  let customer = await newCustomer.save();
  console.log(order);
  console.log(customer);
};

//addNewCustomer();
const deleteCustomer = async () => {
  let data = await Customer.findByIdAndDelete({
    _id: "66d1bafa1b834c719ad16c17",
  });
  console.log(data);
};
deleteCustomer();

const addOrder = async () => {
  let result = await Order.insertMany([
    { item: "burger", price: 40 },
    { item: "momos", price: 60 },
    { item: "vadapav", price: 40 },
  ]);
  console.log(result);
};

//addOrder();
