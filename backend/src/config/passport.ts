import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findUserByEmail, createUser, findUserById } from "../services/authService";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0].value!;
      const firstName = profile.name?.givenName || "";
      const lastName = profile.name?.familyName || "";
      const username = profile.displayName;
      const photo = profile.photos?.[0].value || "";

      try {
        let user = await findUserByEmail(email);
        if (!user) {
          user = await createUser({ email, firstName, lastName, username, photo });
        }
        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);
