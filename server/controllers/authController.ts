import jwt from 'jsonwebtoken';
import User from "../models/User";
import { generalRequestBody } from "../utils/types";
import { Request, Response } from "express";




class AuthController {
    handleCreateUser = async(personalData:generalRequestBody)=>{
        const newUser  =  await new User({
          ...personalData,
        }).save();      
        return newUser;      
    };

    jwtSignAndRedirect = (res:Response,user:generalRequestBody)=>{
        const payload = {
          user: {
            id: user._id,
          },
        };
        const payloadStringified = JSON.stringify({
            token:jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60*2400 }),
            user,
        });
        console.log('payload stringified',payloadStringified);
        //set user information to cookie
        res.cookie("auth-cookie",payloadStringified); 
        res.redirect('/');
    }
      
    googleAuthController = async (req: Request, res: Response) => {    
        try {
            const profile = req?.user as generalRequestBody;      
            this.jwtSignAndRedirect(res,profile);        
        } 
        catch (err) {
            console.log("err in google auth callback", err);
            console.error(err.message);
            res.status(500).send("Server error");
        };        
    };

    emailAuthController = async (req: Request, res: Response) => {
    };
};

let authController = new AuthController();

export default authController;