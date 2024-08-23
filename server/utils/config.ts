import passport from "passport"
import axios from 'axios';
import { Strategy as GoogleStrategy} from "passport-google-oauth20"
import User from "../models/User"
import mongoose from "mongoose";




export class appConfig {

  host = process.env['NODE_ENV'] !=='production'? 'localhost':'';
  
   
  initializePassportStrategy = ()=>{

    // Serialize User
    passport.serializeUser((user, done) => {
      done(null, user)
    })

    // Deserialize User
    passport.deserializeUser((id, done) => {
      done(null, id)
    });

    // Configure Google Strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env['GOOGLE_CLIENT_ID'],
          clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
          callbackURL: `${process.env['BACKEND_URL']}/api/auth/google/callback`,
          proxy: true,
          passReqToCallback: true,
        },
        async (_req, _accessToken, _refreshToken, profile, done) => {
          try {
            let user;
            await User.findOne({ tenantId: profile?.id }).then(
              async (userProfile) => {
                if (userProfile) {
                  console.log('user found')
                  user = userProfile;
                } 
                else {
                  console.log('creatinig new user')
                  const avatar = profile?.photos[0]?.value
                  let email = profile?.emails?.find((email) => email?.verified)?.value
                  let constructNewUserObj = {
                    provider: "google",
                    email,
                    firstName: `${profile.name.givenName}`,
                    lastName: `${profile.name.familyName}`,
                    role: "client",
                    ...(avatar ? { avatar } : {}),
                  };
                  user = await new User(constructNewUserObj).save();
                }
              }
            )
            return done(null, user)
          } catch (err) {
            console.log("err at google oauth", err)
          }
        }
      )
    )

  };

  connectDB = async () => {
    try {

      console.log('connecting db');

      mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected...");

    }
    catch (err) {

      console.error("error at connecting db", err.message)
      process.exit(1)

    }
  };

  axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization':''
    }
  });


};







