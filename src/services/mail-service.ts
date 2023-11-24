import { sendEmail } from "@/lib/send-email"


export async function sendMailToGabi(name: string, email: string, content: string) {
  
    const from= process.env.EMAIL_FROM || "Uruguay en Vinos <webserver@tinta.wine>"
    const to= process.env.EMAIL_TO || "rapha@tinta.wine"
    const subject= "Mensaje desde Uruguay en Vinos"
    const text= `
Tines un nuevo lead en el CRM de Gabi Zimmer ;-)
  `
    await sendEmail(from, to, subject, text)
  
  }
  