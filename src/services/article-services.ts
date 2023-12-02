import * as z from "zod"
import { prisma } from "@/lib/db"
import { CategoryDAO, getCategorysDAO } from "./category-services"

export type ArticleDAO = {
  id:  string
	title:  string
	description?:  string
	slug:  string
	content:  string
  image?: string | null
  summary?: string | null
	status:  string
	createdAt:  Date
	updatedAt:  Date
	publishedAt?:  Date
	authorId:  string
  authorName?: string | null
//  categories?: string[]
  files?: FileDAO[]
  categories: CategoryDAO[]
}

export type FileDAO = {
  id:  string
  public_id:  string
  original_filename:  string
  bytes:  number
  format:  string
  secure_url:  string
  thumbnail_url:  string  
  articleId?:  string
  articleName?: string | null
}

export const fileFormSchema = z.object({
  public_id: z.string({required_error: "Public Id is required."}),
  original_filename: z.string({required_error: "Original Filename is required."}),
  bytes: z.number({required_error: "Bytes is required."}),
  format: z.string({required_error: "Format is required."}),
  secure_url: z.string({required_error: "Secure Url is required."}),
  thumbnail_url: z.string({required_error: "Thumbnail Url is required."}),
})

export type FileFormValues = z.infer<typeof fileFormSchema>

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
      author: true,
      categories: true,
      files: true
    },
  })

  const res = found.map((article) => ({
    ...article,
    authorName: article.author?.name || null,
//    categories: article.categories?.map((category) => category.name) || [],
  }))

  return res as ArticleDAO[]
}

export async function getArticlesDAOByCategory(categoryId: string) {
  const found = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      categories: {
        some: {
          id: categoryId
        }
      }
    },
    include: {
      author: true,
      categories: true,
      files: true
    },
  })

  const res = found.map((article) => ({
    ...article,
    authorName: article.author?.name || null,
//    categories: article.categories?.map((category) => category.name) || [],
  }))

  return res as ArticleDAO[]
}
  
export async function getArticleDAO(id: string) {
  const found = await prisma.article.findUnique({
    where: {
      id
    },
    include: {
      author: true,
      categories: true,
      files: true
    }
  })

  if (!found) return null

  const res = {
    ...found,
    authorName: found.author?.name || null,
//    categories: found.categories?.map((category) => category.name) || [],
  }

  return res as ArticleDAO
}

export async function getArticlesDAOBySlug(slug: string) {
  const found = await prisma.article.findUnique({
    where: {
      slug
    },
    include: {
      author: true,
      categories: true,
      files: true
    }
  })

  if (!found) return null

  const res = {
    ...found,
    authorName: found.author?.name || null,
//    categories: found.categories?.map((category) => category.name) || [],
  }

  return res as ArticleDAO
}
  
    
export async function createArticle(data: ArticleFormValues, categoryId?: string) {

  const created = await prisma.article.create({
    data
  })

  if (categoryId) {
    // connect article to category
    await prisma.article.update({
      where: {
        id: created.id
      },
      data: {
        categories: {
          connect: {
            id: categoryId
          }
        }
      }
    })    
  }
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
    
export async function addFile(id: string, file: FileFormValues) {
  
  const article= await prisma.article.findUnique({
    where: {
      id
    }
  })
  if (!article) return null

  const updated = await prisma.file.create({
    data: {
      ...file,
      article: {
        connect: {
          id
        }
      }
    }
  })
  return updated
}


export async function addImage(id: string, image: string) {
  
  const updated = await prisma.article.update({
    where: {
      id
    },
    data: {
      image
    }
  })
  
  return updated
}

export async function addSummary(id: string, summary: string) {
  
  const updated = await prisma.article.update({
    where: {
      id
    },
    data: {
      summary
    }
  })
  
  return updated
}

export async function publishArticle(id: string) {
  
  const updated = await prisma.article.update({
    where: {
      id
    },
    data: {
      status: "published",
      publishedAt: new Date()
    }
  })
  
  return updated
}

export async function unpublishArticle(id: string) {
  
  const updated = await prisma.article.update({
    where: {
      id
    },
    data: {
      status: "draft",
      publishedAt: null
    }
  })
  
  return updated
}

export async function getComplentaryCategorys(id: string) {
  const found = await prisma.article.findUnique({
    where: {
      id
    },
    include: {
      categories: true
    }
  })
  const all= await getCategorysDAO()
  const res= all.filter(aux => {
    return !found?.categories.find(c => c.id === aux.id)
  })
  
  return res
}

export async function setCategorys(id: string, categorys: CategoryDAO[]) {
  const oldCategorys= await prisma.article.findUnique({
    where: {
      id
    },
    include: {
      categories: true
    }
  })
  .then(res => res?.categories)

  await prisma.article.update({
    where: {
      id
    },
    data: {
      categories: {
        disconnect: oldCategorys
      }
    }
  })

  const updated= await prisma.article.update({
    where: {
      id
    },
    data: {
      categories: {
        connect: categorys.map(c => ({id: c.id}))
      }
    }
  })

  if (!updated) {
    return false
  }

  return true
}
