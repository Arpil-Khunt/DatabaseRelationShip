const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("connection successful!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//define the schema for user for one to few cardinality

const userSchema = new Schema({
  username: String,
  addresses: [{ _id: false, location: String, city: String }],
});

const User = mongoose.model("User", userSchema);

//one to one cardinality in mongoDB
const addUsers = async () => {
  let user1 = new User({
    username: "sharelockhome",
    addresses: [{ location: "221b Baker Street", city: "London" }],
  });
  user1.addresses.push({
    location: "p36 DownTown",
    city: "London",
  });
  let result = await user1.save();
  console.log(result);
};

addUsers();
