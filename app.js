const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});
app.get("/db", (req, res) => {});

app.listen(PORT, () => {
  console.log(`listing on port ${PORT}`);
});
