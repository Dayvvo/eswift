import { createTransport } from 'nodemailer'
import { google } from 'googleapis'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const OAuth2 = google.auth.OAuth2

const { PASS, SENDING_MAIL } = process.env


const getOauthCreds = async()=>{
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env

  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  })

  const accessToken = await oauth2Client.getAccessToken()
  const clientId=CLIENT_ID;
  const clientSecret= CLIENT_SECRET;
  const refreshToken= REFRESH_TOKEN;

  return {
    clientId,
    clientSecret,
    refreshToken,
    accessToken: accessToken.token!,
  };

};

export const mailTransport = async (
  from: string,
  to: string,
  subject: string,
  html: any,
  optional?:{
    attachments?: any,
    smtpConfig?:boolean  
  }
) => {
  const {attachments,smtpConfig} = optional || {};
  const smtpTransportOptions: SMTPTransport.Options = {
    service: 'gmail',
    auth: smtpConfig? {
      user: SENDING_MAIL,
      pass: PASS,
    }:{
      type: 'OAuth2',
      user: SENDING_MAIL,
      ...await getOauthCreds()
    },
    tls: {
      rejectUnauthorized: false,
    },
  }

  const smtpTransport = createTransport(smtpTransportOptions)

  const mailOptions = {
    from,
    to,
    subject,
    html,
    attachments,
  };
  console.log('mail options',mailOptions);

  try {
    const info = await smtpTransport.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error(`Error sending mail to ${to}: ${error}`);
    throw error;
  }
}
