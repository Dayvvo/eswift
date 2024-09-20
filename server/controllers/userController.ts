import User from "../models/User";
import { Request, Response } from "express";
import { validateSignupData } from "../utils/validation";
import { ISignupValidation } from "../utils/interfaces/interface.validation";
import generateToken from "../utils/helperFunctions/generateToken";

class UserController {
  async verifyUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { verification } = req.body;
    const allowedVerificationStatuses = ["pending", "verified", " "];
    if (!allowedVerificationStatuses.includes(verification)) {
      return res.status(400).json({ message: "Invalid verification status" });
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { verification: verification },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(201).json({
        statusCode: 201,
        message: "Verification status updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).send("Failed to update verification status");
    }
  }
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        message: "Fetched successfully",
        data: users,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).send("Failed to fetch all users");
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        data: user,
      });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  };

  addUser = async (req: Request, res: Response) => {
    const body: ISignupValidation = req.body;

    try {
      const validate = validateSignupData(body);
      const { error } = validate;
      if (error) {
        return res.status(400).json(error.details[0]);
      }
      const { email, password, firstName, lastName, role } = body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res
          .status(400)
          .json({ statusCode: 400, message: "User with email already exists" });
      }

      const user = await User.create({
        email,
        hash: password,
        firstName,
        lastName,
        role,
      });

      return res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } catch (err) {
      console.log("Error in email login", err);
      res.status(500).send("Internal Server Error");
    }
  };
}

let userController = new UserController();

export default userController;
