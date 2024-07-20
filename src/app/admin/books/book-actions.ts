"use server"
  
import { revalidatePath } from "next/cache"
import { BookDAO, BookFormValues, createBook, updateBook, deleteBook, getBookDAO, setStatusBook } from "@/services/book-services"
import { BookStatus } from "@prisma/client"


export async function getBookDAOAction(id: string): Promise<BookDAO | null> {
    return getBookDAO(id)
}

export async function createOrUpdateBookAction(id: string | null, data: BookFormValues): Promise<BookDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateBook(id, data)
    } else {
        updated= await createBook(data)
    }     

    revalidatePath("/admin/books")

    return updated as BookDAO
}

export async function deleteBookAction(id: string): Promise<BookDAO | null> {    
    const deleted= await deleteBook(id)

    revalidatePath("/admin/books")

    return deleted as BookDAO
}

export async function setStatusBookAction(id: string, status: BookStatus): Promise<BookDAO | null> {
    const updated= await setStatusBook(id, status)

    revalidatePath("/admin/books")

    return updated as BookDAO
}
