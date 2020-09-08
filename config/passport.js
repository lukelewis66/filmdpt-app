//https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436
//what I referenced to get this working
jwtSecret = require("./jwtConfig");
bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  User = require("../sequelize"),
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username: username,
          },
        }).then((user) => {
          if (user !== null) {
            console.log("an account with this email already exists");
            return done(null, false, {
              message: "an account with this email already exists",
            });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
              User.create({ username, password: hashedPassword }).then(
                (user) => {
                  console.log("user created");
                  return done(null, user);
                }
              );
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username: username,
          },
        }).then((user) => {
          if (user === null) {
            return done(null, false, { message: "bad email" });
          } else {
            bcrypt.compare(password, user.password).then((response) => {
              if (response !== true) {
                console.log("incorrent password");
                return done(null, false, { message: "incorrent password" });
              }
              console.log("user found & authenticated");
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id,
        },
      }).then((user) => {
        if (user) {
          console.log("user found in db in passport");
          done(null, user);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
