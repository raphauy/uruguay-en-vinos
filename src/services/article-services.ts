import * as z from "zod"
import { prisma } from "@/lib/db"

export type ArticleDAO = {
  id:  string
	title:  string
	description?:  string
	slug:  string
	content:  string
	status:  string
	createdAt:  Date
	updatedAt:  Date
	publishedAt?:  Date
	authorId:  string
}

export const articleFormSchema = z.object({
	title: z.string({required_error: "Title is required."}),
	description: z.string().optional(),
	slug: z.string({required_error: "Slug is required."}),
	content: z.string({required_error: "Content is required."}),
	status: z.string({required_error: "Status is required."}),
	authorId: z.string({required_error: "AuthorId is required."}),
})
export type ArticleFormValues = z.infer<typeof articleFormSchema>

export async function getArticlesDAO() {
  const found = await prisma.article.findMany({
    orderBy: {
      // Aquí puedes poner el campo por defecto por el cual ordenar o parametrizarlo
    },
  })
  return found as ArticleDAO[]
}
  
export async function getArticleDAO(id: string) {
  const found = await prisma.article.findUnique({
    where: {
      id
    },
  })
  return found as ArticleDAO
}
    
export async function createArticle(data: ArticleFormValues) {
  const created = await prisma.article.create({
    data
  })
  return created
}

export async function updateArticle(id: string, data: ArticleFormValues) {
  const updated = await prisma.article.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteArticle(id: string) {
  const deleted = await prisma.article.delete({
    where: {
      id
    },
  })
  return deleted
}
    