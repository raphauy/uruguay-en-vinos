import * as z from "zod"
import { prisma } from "@/lib/db"

export type TagDAO = {
  id:  string
	name:  string
}

export const tagFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
})
export type TagFormValues = z.infer<typeof tagFormSchema>

export async function getTagsDAO() {
  const found = await prisma.tag.findMany({
    orderBy: {
      // Aquí puedes poner el campo por defecto por el cual ordenar o parametrizarlo
    },
  })
  return found as TagDAO[]
}
  
export async function getTagDAO(id: string) {
  const found = await prisma.tag.findUnique({
    where: {
      id
    },
  })
  return found as TagDAO
}
    
export async function createTag(data: TagFormValues) {
  const created = await prisma.tag.create({
    data
  })
  return created
}

export async function updateTag(id: string, data: TagFormValues) {
  const updated = await prisma.tag.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteTag(id: string) {
  const deleted = await prisma.tag.delete({
    where: {
      id
    },
  })
  return deleted
}
    