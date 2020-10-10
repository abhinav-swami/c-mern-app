const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const jwtSecret = "noOneCanGuessIt##$";

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

let User = require("./user.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/c-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.post("/validateToken", (req, res) => {
  var userId = jwt.verify(req.body.token, "noOneCanGuessIt##$");
  // console.log(userId);
  // console.log(req.body);
  if (userId.userId == req.body._id) {
    return res.send({
      status: 200,
      message: "Token valid.",
    });
  } else {
    return res.send({
      status: 500,
      message: "Token invalid.",
    });
  }
});

app.post("/login", (req, res) => {
  User.findOne(
    { user_email: req.body.user_email, user_pwd: req.body.user_pwd },
    (err, userData) => {
      if (err || !userData) {
        return res.send({
          status: 500,
          message: "Incorrect email or password.",
        });
      } else {
        let token = jwt.sign({ userId: userData._id }, jwtSecret);
        // console.log(userData);
        // console.log(token);
        userData.token = token;
        return res.send({
          status: 200,
          message: "User loggedin sucessfully.",
          data: userData,
          token: token,
        });
      }
    }
  );
});

app.post("/signup", (req, res) => {
  // console.log("-- SignUp Body --", req.body);
  var user = new User({
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_pwd: req.body.user_pwd,
  });
  user.save(function (err, userData) {
    if (err) {
      return res.send({
        status: 500,
        message: "Something went wrong",
        data: err,
      });
    } else {
      userData.token = jwt.sign({ userId: userData._id }, jwtSecret);
      return res.send({
        status: 200,
        message: "User registered sucessfully.",
        data: userData,
      });
    }
  });
});

app.get("/showstatics", (req, res) => {
  res.send("/showstatics");
});

app.listen(PORT, () => {
  console.log("server is started on port.", PORT);
});
