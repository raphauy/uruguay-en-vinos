import * as z from "zod"
import { prisma } from "@/lib/db"
import { BookStatus } from "@prisma/client"

export type BookDAO = {
	id: string
	number: number
	email: string
	name: string
	address: string
	city: string
	phone: string
	paymentMethod: string
	date: Date
	quantity: number
	status: BookStatus
}

export const bookSchema = z.object({
	number: z.string().refine((val) => !isNaN(Number(val)), { message: "(debe ser un número)" }).optional(),
	email: z.string().min(1, "email is required."),
	name: z.string().min(1, "name is required."),
	address: z.string().min(1, "address is required."),
	city: z.string().min(1, "city is required."),
	phone: z.string().min(1, "phone is required."),
	paymentMethod: z.string().min(1, "paymentMethod is required."),
	quantity: z.number({required_error: "quantity is required."}),
  status: z.nativeEnum(BookStatus),
})

export type BookFormValues = z.infer<typeof bookSchema>


export async function getBooksDAO() {
  const found = await prisma.book.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as BookDAO[]
}

export async function getBookDAO(id: string) {
  const found = await prisma.book.findUnique({
    where: {
      id
    },
  })
  return found as BookDAO
}
    
export async function createBook(data: BookFormValues) {
  const number= data.number ? Number(data.number) : 0
  const date= new Date()
  const created = await prisma.book.create({
    data: {
      ...data,
      number,
      date,
    }
  })
  return created
}

export async function updateBook(id: string, data: BookFormValues) {
  const number= data.number ? Number(data.number) : 0
  const updated = await prisma.book.update({
    where: {
      id
    },
    data: {
      ...data,
      number,
    }
  })
  return updated
}

export async function deleteBook(id: string) {
  const deleted = await prisma.book.delete({
    where: {
      id
    },
  })
  return deleted
}

export async function setStatusBook(id: string, status: BookStatus) {
  const updated = await prisma.book.update({
    where: {
      id
    },
    data: {
      status
    }
  })
  return updated
}