import User from "@/server/models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, UserRole } from "../interfaces";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env["JWT_SECRET"] as string
      ) as any;
      const userFound = await User.findById(decoded?.user.id).select("-hash");

      req.user = userFound ? userFound : undefined;
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRole.ADMIN) {
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
