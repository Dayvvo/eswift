import axios from 'axios';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import { AuthProvider, UserRole } from './interfaces';
import { generateRefCode } from './helperFunctions/generateRefCode';
export class appConfig {
    constructor() {
        this.host = process.env['NODE_ENV'] !== 'production' ? 'localhost' : '';
        this.initializePassportStrategy = () => {
            // Serialize User
            passport.serializeUser((user, done) => {
                done(null, user);
            });
            // Deserialize User
            passport.deserializeUser((id, done) => {
                done(null, id);
            });
            // Configure Google Strategy
            passport.use(new GoogleStrategy({
                clientID: process.env['GOOGLE_CLIENT_ID'],
                clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: `${process.env['BACKEND_URL']}/api/auth/google/callback`,
                proxy: true,
                passReqToCallback: true,
            }, async (_req, _accessToken, _refreshToken, profile, done) => {
                console.log({ profileCheck: profile?._json });
                const verifiedUser = profile?._json;
                try {
                    const user = await User.findOneAndUpdate({ email: verifiedUser.email }, {
                        tenantId: verifiedUser.sub,
                        firstName: verifiedUser.given_name,
                        lastName: verifiedUser.family_name,
                        avatar: verifiedUser.picture,
                        provider: AuthProvider.GOOGLE,
                        refCode: generateRefCode(8),
                        role: UserRole.CLIENT,
                        isActive: true,
                        isVerified: verifiedUser.email_verified,
                    }, { upsert: true, new: true });
                    return done(null, user);
                }
                catch (error) {
                    console.log('err at google oauth', error);
                }
            }));
        };
        this.connectDB = async () => {
            try {
                console.log('connecting db');
                mongoose.connect(process.env.MONGO_URI);
                console.log('MongoDB Connected...');
            }
            catch (err) {
                console.error('error at connecting db', err);
                process.exit(1);
            }
        };
        this.axiosInstance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Authorization: '',
            },
        });
    }
}
