import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateLoginData } from '../utils/validation';
import { adminUsers } from '../data';
import generateToken from '../utils/helperFunctions/generateToken';
class AuthController {
    constructor() {
        this.handleCreateUser = async (personalData) => {
            const newUser = await new User({
                ...personalData,
            }).save();
            return newUser;
        };
        this.jwtSignAndRedirect = (res, user) => {
            const payload = {
                user: {
                    id: user._id,
                },
            };
            const payloadStringified = JSON.stringify({
                token: jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 60 * 2400,
                }),
                user,
            });
            console.log('payload stringified', payloadStringified);
            //set user information to cookie
            res.cookie('auth-cookie', payloadStringified);
            res.redirect('/');
        };
        this.googleAuthController = async (req, res) => {
            try {
                const profile = req?.user;
                this.jwtSignAndRedirect(res, profile);
            }
            catch (err) {
                console.log('err in google auth callback', err);
                res.status(500).send('Server error');
            }
        };
        this.emailLoginAuthController = async (req, res) => {
            try {
                const body = req.body;
                const validate = validateLoginData(body);
                const { error } = validate;
                if (error) {
                    return res.status(400).json(error.details[0]);
                }
                const { email, password } = body;
                const user = await User.findOne({ email });
                if (user && user.matchPassword && (await user?.matchPassword(password))) {
                    res.json({
                        statusCode: 200,
                        message: 'Successful',
                        data: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.role,
                            token: generateToken(user._id),
                        },
                    });
                }
                else {
                    res
                        .status(401)
                        .json({ statusCode: 401, message: 'Wrong Email or Password' });
                }
            }
            catch (err) {
                console.log('Error in email login', err);
                res.status(500).send('Internal Server Error');
            }
        };
        this.adminSeeder = async (req, res) => {
            adminUsers.forEach((adminUser) => {
                const newUser = new User(adminUser);
                newUser.save();
            });
            console.log(`Seed successful`);
            res.send(`SEED COMPLETE!!`);
        };
    }
}
let authController = new AuthController();
export default authController;
