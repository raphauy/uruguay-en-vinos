"use server"

import { MensajeFormValues } from "./mensaje-forms"



export async function processMessageAction(data: MensajeFormValues): Promise<boolean> {       
  // todo: validate data

  console.log("processMessageAction", data)
  const basePath = process.env.NEXTAUTH_URL || ""
  const libroPreventaServiceId= process.env.LIBRO_PREVENTA_SERVICE_ID || ""
  const url= `${basePath}/api/crm/${libroPreventaServiceId}/add`
  console.log("processMessageAction url", url)
    
  const body = {
    "name": data.name,
    "email": data.email,
    "content": data.content,
    "leadType": "Lector"
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },    
    body: JSON.stringify(body)
  })
  .then(response => {
    console.log("Reservation ok")
    return true
  })
  .catch(error => {
    console.log("processMessageAction error", error)
  })
  
  return false
}
