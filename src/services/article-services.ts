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
  authorName?: string | null
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
      createdAt: "desc"
    },
    include: {
      author: true
    }
  })

  const res = found.map((article) => ({
    ...article,
    authorName: article.author?.name || null
  }))

  return res as ArticleDAO[]
}
  
export async function getArticleDAO(id: string) {
  const found = await prisma.article.findUnique({
    where: {
      id
    },
    include: {
      author: true
    }
  })

  if (!found) return null

  const res = {
    ...found,
    authorName: found.author?.name || null
  }

  return res as ArticleDAO
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

export async function updateContent(id: string, content: string) {
  const updated = await prisma.article.update({
    where: {
      id
    },
    data: {
      content
    }
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
    