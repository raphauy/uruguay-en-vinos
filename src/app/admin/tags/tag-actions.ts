"use server"

import { revalidatePath } from "next/cache"
import { TagDAO, TagFormValues, createTag, updateTag, getTagDAO, deleteTag } from "@/services/tag-services"

export async function getTagDAOAction(id: string): Promise<TagDAO | null> {
  return getTagDAO(id)
}

export async function createOrUpdateTagAction(id: string | null, data: TagFormValues): Promise<TagDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateTag(id, data)
  } else {
      updated= await createTag(data)
  }     

  revalidatePath("/admin/tags")

  return updated as TagDAO
}

export async function deleteTagAction(id: string): Promise<TagDAO | null> {    
  const deleted= await deleteTag(id)

  revalidatePath("/admin/tags")

  return deleted as TagDAO
}
