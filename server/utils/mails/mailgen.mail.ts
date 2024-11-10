import { mailTransport } from '../config/google0athMail.config'
import { mailGenerator } from '../config/mailgen.config'

class MailgenMails {
  async updatePassword(name: string, email: string, password: string,smtpConfig?:boolean) {
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
      template,
      {
        smtpConfig
      }
    );
  }

  async contactEswiftTemplate(name:string,email:string,phone:string,reason:string,contactMode:string,detail:string){
    const html = {
      body: {
        name,
        intro: `
          <div> Name: ${name} </div>
          <div> Phone: ${phone} </div>
          <div> Reason for inquiry: ${reason} </div>
          <div> How they first heard about eswift: ${contactMode} </>
        `,
          
        outro: detail,
      },
    };

    const template = mailGenerator.generate(html)
    await mailTransport(
      `Eswift<${process.env.SENDING_MAIL}>`,
      `${process.env['SENDING_MAIL']}`,
      `You were contacted from e-swiftproperties.com`,
      html,
      {smtpConfig:true}
    );

  }

  
}

export const mailGenMails = new MailgenMails()
