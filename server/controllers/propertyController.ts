import { Request, Response } from 'express'
import {
  ValidateAddProperty,
  validateLoginData,
} from '../utils/validation/index'
import Property from '../models/Property'
import { IUser, IUserInRequest } from '../utils/interfaces'
import { isValidObjectId } from 'mongoose'

class PropertyController {
  //TODO: finish function
  createProperty = async (req: Request, res: Response) => {
    try {
      const validate = ValidateAddProperty(req.body)
      const { value, error } = validate
      if (error) {
        return res.status(400).json(error.details[0])
      }
      const user = req.user as IUserInRequest
      const newProperty = await Property.create({
        ...value,
        creatorID: user?._id,
      })
      await user?.increasePropertyCount()
      return res.status(201).json({
        statusCode: 201,
        message: 'Property Created',
        data: newProperty,
      })
    } catch (err: any) {
      console.error(err?.message)
      res.status(500).send('An Error ocurred while creating property')
    }
  }

  //TODO: finish function
  getCreatedProperties = async (req: Request, res: Response) => {
    const pageSize = 12
    const page = Number(req.params.pageNumber) || 1

    const keyword = req.query.keyword as string
    const regex = new RegExp(keyword, 'i')

    const findQuery = {
      $or: [{ title: regex }, { description: regex }, { category: regex }],
    }

    try {
      const count = await Property.countDocuments(findQuery)
      const properties = await Property.find(findQuery)
        .limit(pageSize)
        .skip(pageSize * (page - 1))

      return res.status(200).json({
        statusCode: 200,
        message: 'Property List',
        data: properties,
        pagination: { page, pages: Math.ceil(count / pageSize) },
      })
    } catch (err: any) {
      console.log('Error in email login', err)
      console.error(err?.message)
      res.status(500).send('An Error ocurred while retrieving data')
    }
  }

  getPropertyById = async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid ObjectId',
      })
    try {
      const property = await Property.findById(id)
      if (!property)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        })

      return res.json({
        statusCode: 200,
        message: 'Successful',
        data: property,
      })
    } catch (error: any) {
      console.log('Error in email login', error)
      console.error(error?.message)
      res.status(500).send('An Error ocurred while retrieving data')
    }
  }

  verifyProperty = async (req: Request, res: Response) => {
    const { id } = req.params
    const { verificationState } = req.body
    const allowedVerificationStatuses = ['Pending', 'Verified', 'Rejected']
    if (!allowedVerificationStatuses.includes(verificationState)) {
      return res.status(400).json({ message: 'Invalid verification status' })
    }

    try {
      const verifyStatus = await Property.findOneAndUpdate(
        { _id: id },
        { verificationState },
        { new: true }
      )

      if (!verifyStatus) {
        return res.status(404).json({ message: 'Property not found' })
      }

      res.status(201).json({
        statusCode: 201,
        message: 'Verification status updated successfully',
        data: verifyStatus?.verificationState,
      })
    } catch (error) {
      res.status(500).send('An error occured while validation property')
    }
  }

  deleteProperty = async (req: Request, res: Response) => {
    const id = req.params.id
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid ObjectId',
      })

    try {
      const deleted = await Property.findByIdAndDelete(id)
      if (!deleted)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        })
      const user = req.user as IUserInRequest
      await user?.decreasePropertyCount()
      return res.json({
        statusCode: 200,
        message: 'Successful',
      })
    } catch (error: any) {
      console.log('Error in email login', error)
      console.error(error?.message)
      res.status(500).send('An Error ocurred while retrieving data')
    }
  }
}

let propertyController = new PropertyController()

export default propertyController
