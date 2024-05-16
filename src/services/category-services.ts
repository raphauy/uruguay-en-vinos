import * as z from "zod"
import { prisma } from "@/lib/db"

export type CategoryDAO = {
  id:  string
	name:  string
	description?:  string
}

export const categoryFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string().optional(),
})
export type CategoryFormValues = z.infer<typeof categoryFormSchema>

export async function getCategorysDAO() {
  const found = await prisma.category.findMany({
    orderBy: {
      // Aquí puedes poner el campo por defecto por el cual ordenar o parametrizarlo
    },
  })
  return found as CategoryDAO[]
}
  
export async function getCategoryDAO(id: string) {
  const found = await prisma.category.findUnique({
    where: {
      id
    },
  })
  return found as CategoryDAO
}

export async function getCategoryDAOByName(name: string) {
  const found = await prisma.category.findUnique({
    where: {
      name
    },
  })
  return found as CategoryDAO
}
    
export async function createCategory(data: CategoryFormValues) {
  const created = await prisma.category.create({
    data
  })
  return created
}

export async function updateCategory(id: string, data: CategoryFormValues) {
  const updated = await prisma.category.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteCategory(id: string) {
  const deleted = await prisma.category.delete({
    where: {
      id
    },
  })
  return deleted
}
    