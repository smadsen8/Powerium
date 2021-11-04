//contains passport related info
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  //function of authenticating users on login page. Done is a function that is called when we are done authenticating the user
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email); //function that returns a user by email

    if (user == null) {
      return done(null, false, { message: "No user found with that email" }); //false becuase no user found
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect, Try again" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  //serilaize user to store inside of the session
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
