import { Request, Response } from "express";
import {
  ValidateAddProperty,
  ValidateEditProperty,
  validateLoginData,
} from "../utils/validation/index";
import Property from "../models/Property";
import { IUser, IUserInRequest } from "../utils/interfaces";
import { isValidObjectId, ObjectId } from "mongoose";
import PropertyDocs from "../models/PropertyDocs";
import Favourite from "../models/FavouriteProperty";

import mongoose from "mongoose";
import { HttpStatusCode } from "axios";

class PropertyController {
  //TODO: finish function
  createProperty = async (req: Request, res: Response) => {
    console.log("request body", req.body);
    const validate = ValidateAddProperty(req.body);
    const { value, error } = validate;

    if (error) {
      return res.status(400).json(error.details[0]);
    }

    const user = req.user! as any;
    try {
      const newProperty = new Property({ creatorID: user["_id"], ...value });

      await newProperty.save();

      return res.status(HttpStatusCode.Created).json({
        statusCode: 200,
        message: "Property created",
        data: newProperty,
      });
    } catch (error: any) {
      console.error(error?.message);
      return res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  updateProperty = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });
    const validate = ValidateEditProperty(req.body);
    const { value, error } = validate;

    if (error) {
      return res.status(400).json(error.details[0]);
    }

    try {
      const property = await Property.findById(id);
      if (!property)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });

      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        { ...value },
        { new: true }
      );

      return res.status(HttpStatusCode.Created).json({
        statusCode: 200,
        message: "Property created",
        data: updatedProperty,
      });
    } catch (error: any) {
      console.error(error?.message);
      return res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  adminGetAllProperties = async (req: Request, res: Response) => {
    const pageSize = 60;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword as string;
    const regex = new RegExp(keyword, "i");

    const findQuery = {
      $or: [{ title: regex }, { description: regex }, { category: regex }],
    };

    try {
      const count = await Property.countDocuments(findQuery);
      const properties = await Property.find(findQuery)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      return res.status(200).json({
        statusCode: 200,
        message: "Property List",
        data: properties,
        pagination: { page, pages: Math.ceil(count / pageSize), count },
      });
    } catch (err: any) {
      console.log("Error in email login", err);
      console.error(err?.message);
      return res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  //TODO: finish function
  getCreatedProperties = async (req: Request, res: Response) => {
    const pageSize = 60;
    const page = Number(req.params.pageNumber) || 1;

    const keyword = req.query.keyword as string;

    const regex = new RegExp(keyword, "i");

    const findQuery = {
      $or: [{ title: regex }, { description: regex }, { category: regex }],
      isActive: true,
    };

    try {
      const count = await Property.countDocuments(findQuery);

      const properties = await Property.find(findQuery)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      return res.status(200).json({
        statusCode: 200,
        message: "Property List",
        data: properties,
        pagination: { page, pages: Math.ceil(count / pageSize), count },
      });
    } catch (err: any) {
      console.error(err?.message);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  getPropertyById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });

    const user = req.user as any;
    const userId = user?._id as string;
    try {
      const property = await Property.findById(id);
      // Check if the property is in the user's favorites

      const isFavorite = await Favourite.exists({ user: userId, property: id });
      
      if (!property)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });

      return res.json({
        statusCode: 200,
        message: "Successful",
        data: { ...property, isFavorite },
      });
    } catch (error: any) {
      console.log("Error in email login", error);
      console.error(error?.message);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  isActiveSwitch = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });

    try {
      const newProperty = await Property.findById(id);
      if (!newProperty)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });

      newProperty.isActive = !newProperty.isActive;
      newProperty.save();

      return res.json({
        statusCode: 200,
        message: `Property active switched from ${!newProperty.isActive} to ${
          newProperty.isActive
        }`,
      });
    } catch (error: any) {
      console.log("Error", error);
      console.error(error?.message);
      res.status(500).send("An Error ocurred while updating data");
    }
  };

  verifyProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { verification } = req.body;
    const allowedVerificationStatuses = [
      "pending",
      "verified",
      "rejected",
      "suspend",
    ];
    if (!allowedVerificationStatuses.includes(verification)) {
      return res.status(400).json({ message: "Invalid verification status" });
    }

    try {
      const verifyStatus = await Property.findOneAndUpdate(
        { _id: id },
        { verification },
        { new: true }
      );

      if (!verifyStatus) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Verification status updated successfully",
        data: verifyStatus?.verification,
      });
    } catch (error) {
      res.status(500).send("An error occured while validation property");
    }
  };

  deleteProperty = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });

    try {
      const deleted = await Property.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });
      const user = req.user as IUserInRequest;
      await user?.decreasePropertyCount();
      return res.json({
        statusCode: 200,
        message: "Successful",
      });
    } catch (error: any) {
      console.log("Error in email login", error);
      console.error(error?.message);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  getPropertyDocs = async (req: Request, res: Response) => {
    try {
      const propsDoc = await PropertyDocs.find();
      res.status(200).json({
        message: "success",
        data: propsDoc,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };
}

let propertyController = new PropertyController();

export default propertyController;
