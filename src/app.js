if (process.env.NODE_ENV !== "production") {
  //going to load all the enviroment variables and set them in process.env
  require("dotenv").config();
}

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const urlencodedParser = express.urlencoded({ extended: false });
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const initializePassport = require("./passport-config");
const api = require("./api/index");
const db = require("./db/connection");
const userRouter = require("./routes/user-router");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./control/auth-control");

const app = express();
const port = process.env.PORT || 4000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const users = [];

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email), //function for finding user based on email
  (id) => users.find((user) => user.id === id)
);

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "myvaluehere", //a key we keep secret which is going to encrypt all of our info for us
    resave: false, //If nothing has changed, we dont want to resave our session variables hence false
    saveUninitialized: false, //We dont want to save an empty value in this session, hence false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("", checkAuthenticated, (req, res) => {
  res.render("homePage", {
    title: "Powerium",
  });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

app.post(
  "/login",
  checkNotAuthenticated,
  urlencodedParser,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.body.action == "Register") {
      res.redirect("/register");
    }
  }
);

// app.post('/login', urlencodedParser, (req, res) => {
//     if(req.body.action == 'Login'){
//         //check to make sure valid login credentials here...NEEDS TO BE CODED
//         res.redirect('/');

//     } else if(req.body.action == 'Register'){
//         res.redirect('/register')
//     }
// })

//What is this?? -Charlie
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register", {
    title: "Register Account",
  });
});

//Stores the register page input in MongoDB database
app.post(
  "/register",
  checkNotAuthenticated,
  urlencodedParser,
  async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      api.createUser(payload);
      res.redirect("/login");
    } catch {
      res.redirect("/register");
    }
  }
);

app.get("/inputs", (req, res) => {
  res.render("inputs", {
    title: "Inputs",
  });
});

app.post("/inputs", urlencodedParser, (req, res) => {
  console.log(req.body);

  // test('Test For Valid Water Heater Temperature', () => {
  //     expect(waterHeaterValid(req.body.waterHeaterTemp)).toBe(true);
  // })

  // test('Test For Valid Shower Length Time', () => {
  //     expect(showerLengthValid(req.body.showerLengthTime)).toBe(true);
  // })

  // test('Test For Valid Air Conditioning Temperature', () => {
  //     expect(airConditioningValid(req.body.airConditioingTemp)).toBe(true);
  // })

  // test('Test For Valid Eating Out Number', () => {
  //     expect(eatingOutValid(req.body.eatingOutNum)).toBe(true);
  // })

  res.redirect("/");
});

app.get("/trends", (req, res) => {
  res.render("trends", {
    title: "Personalized Trends",
  });
});

app.get("/suggestions", (req, res) => {
  res.render("suggestions", {
    title: "Personalized Suggestions",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Powerium",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Help",
  });
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

/*
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect("/login");
  }

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
