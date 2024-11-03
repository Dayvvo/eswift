import express from 'express'
import uploadController from '../controllers/uploadController'
import { appConfig } from '../utils/config'
import multerConfig from '../utils/config/multer.config'

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
