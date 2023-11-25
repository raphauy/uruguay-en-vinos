"use server"

import { revalidatePath } from "next/cache"
import { ArticleDAO, ArticleFormValues, createArticle, updateArticle, getArticleDAO, deleteArticle, updateContent, addFile, FileFormValues, FileDAO, addImage, addSummary } from "@/services/article-services"
import { getCurrentUser } from "@/lib/auth"
import { JSONContent } from "@tiptap/core"

export async function getArticleDAOAction(id: string): Promise<ArticleDAO | null> {
  return getArticleDAO(id)
}

export async function createOrUpdateArticleAction(id: string | null, data: ArticleFormValues): Promise<ArticleDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateArticle(id, data)
  } else {
      updated= await createArticle(data)
  }     

  revalidatePath("/admin/articles")

  return updated as ArticleDAO
}

export async function createArticleAction(title: string, categoryId?: string): Promise<ArticleDAO | null> {
  const user= await getCurrentUser()
  if (!user) return null

  const slug= title.toLowerCase().replace(/ /g, "-")
  const status= "draft"
  const authorId= user.id
  const content= ""
  const data= { title, slug, status, authorId, content }
  const created= await createArticle(data, categoryId)

  revalidatePath("/admin/articles")

  return created as ArticleDAO
}

export async function updateContentAction(id: string, content: string): Promise<ArticleDAO | null> {
  console.log("updateContentAction", id, content);
  
  const updated= await updateContent(id, content)

  revalidatePath("/admin/articles")

  return updated as ArticleDAO
}

export async function deleteArticleAction(id: string): Promise<ArticleDAO | null> {    
  const deleted= await deleteArticle(id)

  revalidatePath("/admin/articles")

  return deleted as ArticleDAO
}

export async function addFileAction(id: string, file: FileFormValues): Promise<FileDAO | null> {
  const updated= await addFile(id, file)

  revalidatePath("/admin/articles")

  return updated as FileDAO
}

export async function addImageAction(id: string, image: string): Promise<ArticleDAO | null> {
  const updated= await addImage(id, image)

  revalidatePath("/admin/articles")

  return updated as ArticleDAO
}

export async function addSummaryAction(id: string, summary: string): Promise<ArticleDAO | null> {
  const updated= await addSummary(id, summary)

  //revalidatePath("/admin/articles")

  return updated as ArticleDAO
}

export async function getFilesDAOAction(id: string): Promise<FileDAO[] | null> {
  const article= await getArticleDAO(id)
  if (!article) return null
  return article.files as FileDAO[]
}