import nodemailer from 'nodemailer';

export async function sendEmail(from: string, to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    })
    const info = await transporter.sendMail({from, to, subject, text })
    console.log("Message sent: %s", info.messageId)
    
    return info
  }