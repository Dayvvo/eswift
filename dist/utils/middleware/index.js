import User from "../../models/User";
import jwt from "jsonwebtoken";
import { UserRole } from "../interfaces";
export const isAuth = async (req, res, next) => {
    let token = "";
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;
            console.log('token', token);
            const decoded = jwt.verify(token, process.env["JWT_SECRET"]);
            console.log('user found', decoded);
            const userFound = await User.findById(decoded?.id).select("-hash");
            console.log('userFound', userFound);
            req.user = userFound ? userFound : undefined;
            if (!req.user) {
                return res
                    .status(401)
                    .json({ message: "Not authorized, user not found" });
            }
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
export const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user?.role !== UserRole.ADMIN) {
        return res
            .status(403)
            .json({ message: "Unauthorized: Admin access required" });
    }
    next();
};
// // Ensure user is an admin
// export const admin = async (req:RequestWithUser, res:Response,next:NextFunction) => {
//   const user = await User.findOne({
//     _id: req.user.id,
//   })
//   if (user.role === "Admin") {
//     next()
//   } else {
//     res.status(401).json({
//       msg: "Unauthorized",
//     })
//   }
// }
// export const canPerformAction = async (req:RequestWithUser, res:Response,next:NextFunction) => {
//   try {
//     const user = await User.findOne({
//       _id: req.user.id,
//     })
//     const userToUpdate = await User.findOne({
//       _id: req.body["_id"],
//     })
//     if (!user || !userToUpdate) {
//       res.status(401).json({ msg: "User does not exist" })
//     } else {
//       if (APP_ROLES[user?.role] < APP_ROLES[userToUpdate?.role]) {
//         res.status(401).json({ msg: "Unauthorized" })
//       } else {
//         next()
//       }
//     }
//   } catch (err) {
//     console.log("err at verifying id", err)
//     res.status(500).send("Server Error")
//   }
// }
