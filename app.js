/*----Express-----*/
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./modals/user");
app.use(cookieParser());
require("dotenv").config();
/*------PORT------*/
const PORT = process.env.PORT || 8080;
app.use(express.json());
/*----Mango DB----*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ngo")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB error");
    console.log(err);
  });

/*----Configuration--------*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views folder
app.use(express.static(path.join(__dirname, "public"))); // public folder
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.render("templates/login");
});
app.get("/signup", (req, res) => {
  res.render("templates/signup");
});
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let existing = await User.findOne({ email: email });
  res.cookie("user", existing);
  // console.log(res.locals);
  res.redirect("/");
});

app.get("/", (req, res) => {
  console.log(req.cookies.user);
  if (req.cookies.user) {
    return res.render("index.ejs", { data: req.cookies.user });
  }
  res.render("index.ejs", { data: null });
});
app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
