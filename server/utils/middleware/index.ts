import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

export const isAuth = (req:Request, res:Response, next:NextFunction) => {
  // Get token from the header
  const token = req.header("Authorization")

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }

  //  Verify token
  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET'] as string)
    console.log('decoded user',decoded)
    // req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" })
  }
}

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

