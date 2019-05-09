const passport = require('passport');
const GitlabStrategy = require('passport-gitlab2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GitlabStrategy(
    {
      callbackURL: '/auth/gitlab/callback',
      clientID: keys.gitlabClientID,
      clientSecret: keys.gitlabClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
          const existingUser = await User.findOne({gitlabId: profile.id})
          if (!existingUser) {
              // we don't have a user record with this ID, make a new record;
              const user = await new User({gitlabId: profile.id}).save();
              return done(null, user);
          }
          ;
          // we already have a record with the given profile ID;
          done(null, existingUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
