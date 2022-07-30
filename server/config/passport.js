const UserModel = require("../models/user");
const passportJWT = require("passport-jwt");
const passport = require("passport");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = "zoho564";

passport.use(
  new JWTStrategy(opts, function (jwtPayload, cb) {
    return UserModel.findById(jwtPayload._id)
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  })
);
