"use server"

import { revalidatePath } from "next/cache"
import { ArticleDAO, ArticleFormValues, createArticle, updateArticle, getArticleDAO, deleteArticle } from "@/services/article-services"

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

export async function deleteArticleAction(id: string): Promise<ArticleDAO | null> {    
  const deleted= await deleteArticle(id)

  revalidatePath("/admin/articles")

  return deleted as ArticleDAO
}
