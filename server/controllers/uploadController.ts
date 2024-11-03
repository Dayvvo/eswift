import { Request, Response } from 'express'
import cloudinary from '../utils/config/cloudinary.config'
import { UploadApiResponse } from 'cloudinary'
import { BUCKET_NAME, space } from '../utils/config/bucket.config'
import { randomBytes } from 'crypto'
import {
  PutObjectRequest,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
class UploadController {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file.path
      )
      return result.secure_url
    } catch (error: any) {
      throw new Error(`File upload failed: ${error.message}`)
    }
  }

  //this uploads to digital ocean as opposed to cloudinary. All we have to do is replace uploadFile with uploadToDigital Ocean
  async uploadToDigitalOcean(file: Express.Multer.File): Promise<string> {
    console.log('file creds', file.originalname, file.mimetype)
    const uploadParams: PutObjectRequest = {
      Bucket: BUCKET_NAME,
      ContentType: file.mimetype,
      Key: `uploads/${Date.now()}_${randomBytes(4).toString('hex')}.${
        file.mimetype.split('/')[1]
      }`,
      ACL: 'public-read',
      Body: file.buffer as any,
    }
    try {
      const command = new PutObjectCommand(uploadParams)
      await space.send(command)

      //this has to be verified
      return `${process.env.DO_SPACES_ENDPOINT}/${BUCKET_NAME}/${uploadParams.Key}`
    } catch (error: any) {
      console.error('Error uploading file:', error)
      throw new Error('Failed to upload file')
    }
  }

  async uploadSingle(req: Request, res: Response) {
    try {
      const file: Express.Multer.File | null = req.file ? req.file : null
      if (!file) {
        return res
          .status(400)
          .json({ statusCode: 400, message: `Bad Request, No file selected` })
      }

      const secureUrl = await uploadController.uploadToDigitalOcean(file)

      return res.json({
        statusCode: 200,
        message: `Success`,
        data: secureUrl,
      })
    } catch (error: any) {
      return res.status(500).json({
        statusCode: 500,
        message: `Internal Server Error: ${error.message}`,
      })
    }
  }

  async uploadMultiple(req: Request, res: Response) {
    try {
      if (req.files && (req.files.length as number) > 1) {
        const files = req.files as Express.Multer.File[]
        let urls: Array<string> = []
        for (const file of files) {
          urls.push(await uploadController.uploadToDigitalOcean(file))
        }

        return res.json({ statusCode: 200, message: `Success`, data: urls })
      } else {
        return res
          .status(400)
          .json({ statusCode: 400, message: 'Bad Request, no files selected' })
      }
    } catch (error: any) {
      return res.status(500).json({
        statusCode: 500,
        message: `Internal Server Error: ${error.message}`,
      })
    }
  }
}

let uploadController = new UploadController()

export default uploadController
