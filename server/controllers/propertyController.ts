import { Request, Response } from 'express'
import {
  ValidateAddProperty,
  validateLoginData,
} from '../utils/validation/index'
import Property from '../models/Property'
import { IUser } from '../utils/interfaces'
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

      const newProperty = await Property.create({ ...value })

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
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    try {
      const count = await Property.countDocuments({ ...keyword })
      const properties = await Property.find({ ...keyword })
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

  //TODO: Get related Properties
}

let propertyController = new PropertyController()

export default propertyController
