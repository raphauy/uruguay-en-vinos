"use server"

import { revalidatePath } from "next/cache"
import { CategoryDAO, CategoryFormValues, createCategory, updateCategory, getCategoryDAO, deleteCategory } from "@/services/category-services"

export async function getCategoryDAOAction(id: string): Promise<CategoryDAO | null> {
  return getCategoryDAO(id)
}

export async function createOrUpdateCategoryAction(id: string | null, data: CategoryFormValues): Promise<CategoryDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateCategory(id, data)
  } else {
      updated= await createCategory(data)
  }     

  revalidatePath("/admin/categorys")

  return updated as CategoryDAO
}

export async function deleteCategoryAction(id: string): Promise<CategoryDAO | null> {    
  const deleted= await deleteCategory(id)

  revalidatePath("/admin/categorys")

  return deleted as CategoryDAO
}
