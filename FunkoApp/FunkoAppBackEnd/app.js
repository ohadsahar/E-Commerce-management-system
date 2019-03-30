const express = require("express");
const bodyParser = require("body-parser");

const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/cart");
const orders = require("./routes/orders");
const path = require("path");
const Connection = require("./dev/dev");
//returing us an express app
const app = express();

Connection.ConnectMongoose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join("assets/images")));
app.use("/admin/products",products);
app.use("/admin/users",users);
app.use("/admin/carts",carts);
app.use("/admin/orders",orders);
module.exports = app;
