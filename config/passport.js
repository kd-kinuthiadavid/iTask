// Houses jwt strategy config
// @see - http://www.passportjs.org/packages/passport-jwt/

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const keys = require("../keys");

const { JWT_SECRET } = keys;
const passportSecret = JWT_SECRET;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = passportSecret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // get user
      User.findByPk(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch((err) =>
          console.error(
            "**** passport config: error fetching user by id *****",
            err
          )
        );
    })
  );
};
