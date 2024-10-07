import cloudinary from '../utils/config/cloudinary.config';
class UploadController {
    async uploadFile(file) {
        try {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        }
        catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }
    async uploadSingle(req, res) {
        try {
            const file = req.file ? req.file : null;
            if (!file) {
                return res
                    .status(400)
                    .json({ statusCode: 400, message: `Bad Request, No file selected` });
            }
            const secureUrl = await uploadController.uploadFile(file);
            return res.json({
                statusCode: 200,
                message: `Success`,
                data: secureUrl,
            });
        }
        catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: `Internal Server Error: ${error.message}`,
            });
        }
    }
    async uploadMultiple(req, res) {
        try {
            if (req.files && req.files.length > 1) {
                const files = req.files;
                let urls = [];
                for (const file of files) {
                    urls.push(await uploadController.uploadFile(file));
                }
                return res.json({ statusCode: 200, message: `Success`, data: urls });
            }
            else {
                return res
                    .status(400)
                    .json({ statusCode: 400, message: 'Bad Request, no files selected' });
            }
        }
        catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: `Internal Server Error: ${error.message}`,
            });
        }
    }
}
let uploadController = new UploadController();
export default uploadController;
