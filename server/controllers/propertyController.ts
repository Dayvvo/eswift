import { Request, Response } from "express";
import { validateLoginData } from '../utils/validation/index'
import Property from '../models/Property';


class PropertyController {
    
  //TODO: finish function
  createProperty = async (req: Request, res: Response) => {
    try {
      const validate = validateLoginData(req.body)
      const { value, error } = validate
      if (error) {
        return res.status(400).json(error.details[0])
      }
      const newProperty = new Property(value).save();
      return res.status(200).json({ statusCode: 200, data: newProperty, message:'Property Created'})
    } catch (err:any) {
      console.log('Error in email login', err);
      console.error(err?.message);
      res.status(500).send('Internal Server Error');
    }
  }

  //TODO: finish function
  getCreatedProperties = async (req: Request, res: Response) => {
    try {
    } catch (err:any) {
      console.log('Error in email login', err);
      console.error(err?.message);
      res.status(500).send('Internal Server Error');
    }
  };

}

let propertyController = new PropertyController()

export default propertyController;
