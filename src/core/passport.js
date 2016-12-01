import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User, UserLogin, UserClaim, UserProfile } from '../data/models';
import { auth as config } from '../config';

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: '/login/google/return',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'google';
  const claimType = 'urn:google:access_token';
  const fooBar = async () => {
    if( !profile.email || (profile.email && !profile.email.endsWith('@uptive.se'))){
      done(null);
    }
    else {

      var username = profile.email.split("@")[0];

      if (req.user) {
        done(null, {
          id: req.user.id,
          email: profile.email,
          username: username,
          name: {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
          },
        });
      }
      else{
        done(null, {
          id: profile.id,
          email: profile.email,
          username: username,
          name: {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
          },
        });
      }
    }
  };


  fooBar().catch(done);
}));

export default passport;
