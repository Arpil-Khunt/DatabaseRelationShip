//one to many => one to squilians ...example
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
  let user = await User.findOne({ username: "arpil_khunt" });

  let post1 = new Post({
    content: "Summer is very hot in mehsana. __Bliss WaterPark__",
    likes: 141,
  });
  post1.user = user;
  await post1.save();
};

// addData()
//   .then(() => console.log("data added successflly!"))
//   .catch((err) => {
//     console.log(err);
//   });

//find data ==> extract data using populate
const getData = async () => {
  let result = await Post.find({}).populate("user");
  console.log(result);
};

//call the getData function
getData();
