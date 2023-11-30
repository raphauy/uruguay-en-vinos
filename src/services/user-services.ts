import * as z from "zod"
import { prisma } from "@/lib/db"

export type UserDAO = {
  id:  string
	name?:  string
	email:  string
	role:  string
	emailVerified?:  Date
	image?:  string
}

export const userFormSchema = z.object({
	name: z.string().optional(),
	email: z.string({required_error: "Email is required."}),
	role: z.string({required_error: "Role is required."}),
})
export type UserFormValues = z.infer<typeof userFormSchema>

export async function getUsersDAO() {
  const found = await prisma.user.findMany({
    orderBy: {
      // Aquí puedes poner el campo por defecto por el cual ordenar o parametrizarlo
    },
  })
  return found as UserDAO[]
}
  
export async function getUserDAO(id: string) {
  const found = await prisma.user.findUnique({
    where: {
      id
    },
  })
  return found as UserDAO
}
    
export async function createUser(data: UserFormValues) {
  const created = await prisma.user.create({
    data
  })
  return created
}

export async function updateUser(id: string, data: UserFormValues) {
  const updated = await prisma.user.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteUser(id: string) {
  const deleted = await prisma.user.delete({
    where: {
      id
    },
  })
  return deleted
}
    