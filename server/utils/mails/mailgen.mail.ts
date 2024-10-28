import { mailTransport } from '../config/google0athMail.config'
import { mailGenerator } from '../config/mailgen.config'

class MailgenMails {
  async updatePassword(name: string, email: string, password: string) {
    const html = {
      body: {
        name,
        intro: `Welcome to Eswift! We're very excited to have you on board. Your generated password is ${password}. You would be required to change this during your first signup.`,
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }

    const template = mailGenerator.generate(html)

    await mailTransport(
      `Eswift<${process.env.SENDING_MAIL}>`,
      email,
      'Eswift Password Update',
      template
    )
  }
}

export const mailGenMails = new MailgenMails()
