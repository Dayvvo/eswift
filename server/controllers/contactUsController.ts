import { Request, Response } from "express";
// import sendEmail from "../utils/service/email";
import { validateMailbody } from "../utils/validation";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { MailType } from "../utils/interfaces/mailtype.interface";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: { rejectUnauthorized: false },
});

const sendEmailFunction = async ({
  email,
  name,
  message,
  subject,
}: MailType) => {
  const mailOptions = {
    from: email,
    to: process.env.CLIENT_EMAIL,
    subject: subject,
    name: name,
    text: message,
    replyTo: email,
  };

  try {
    const send = await transporter.sendMail(mailOptions);
    return send;
  } catch (error: any) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

class ContactUsController {
  sendEmail = async (req: Request, res: Response) => {
    try {
      const { error, value } = validateMailbody(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const mailSent = await sendEmailFunction(value);
      return res.status(201).json({
        message: "Email sent successfully",
        data: mailSent,
      });
    } catch (error) {
      res.status(500).send("Failed to send email");
    }
  };
}

let contactUsController = new ContactUsController();

export default contactUsController;
