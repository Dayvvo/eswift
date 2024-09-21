import express, { Request, Response } from 'express'
import { appConfig } from '../utils/config'
import multerConfig from '../utils/config/multer.config'
import cloudinary from '../utils/config/cloudinary.config'
import { UploadApiResponse } from 'cloudinary'
import UploadController from '../controllers/uploadController'
import uploadController from '../controllers/uploadController'

const router = express.Router()
const config = new appConfig()

router.post(
  '/image',
  multerConfig.single('file'),
  uploadController.uploadSingle
)

router.post(
  '/images',
  multerConfig.array('files'),
  uploadController.uploadMultiple
)

export default router
