"use client"

import { Button } from "@/components/ui/button"
import { BookDAO } from "@/services/book-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { DeleteBookDialog, BookDialog } from "./book-dialogs"
import { cn, completeWithZeros } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import SetStatusButtons from "./set-status-buttons"


export const columns: ColumnDef<BookDAO>[] = [
  
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className=" dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Status
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data= row.original
      const status= data.status ? data.status : ""
      const date= data.date && format(new Date(data.date), "yyyy-MM-dd")
      return (
        <div className="flex flex-col items-center">
          <Badge className={cn("bg-black", status === "DELIVERED" && "bg-green-500", status === "IN_WAREHOUSE" && "bg-blue-500")}>
            {status}
          </Badge>
          <p className="mt-4">#{completeWithZeros(data.number)}</p>
          <p>{date}</p>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data= row.original
      const name= data.name ? data.name : ""
      return (
        <div>
          <p>{name}</p>
          <p>{data.email}</p>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const data= row.original
      const name= data.name.toLowerCase()
      const email= data.email.toLowerCase()
      const address= data.address.toLowerCase()
      const phone= data.phone.toLowerCase()
      const number= data.number.toString()
      value= value.toLowerCase()
      return name.includes(value) || email.includes(value) || address.includes(value) || phone.includes(value) || number.includes(value)
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Address
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data= row.original
      const address= data.address ? data.address : ""
      return (
        <div className="">
          <p>{address}</p>
          <p>{data.city}</p>
          <p>{data.phone}</p>
        </div>
      )
    },
  },

  {
    accessorKey: "city",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            City
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            PaymentMethod
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data= row.original
      const paymentMethod= data.paymentMethod ? data.paymentMethod : ""
      const quantity= data.quantity ? data.quantity : ""
      return (
        <div>
          <p>{paymentMethod}</p>
          <p>{quantity}</p>
        </div>
      )
    },
  },  

  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete Book ${data.id}?`
 
      return (
        <div className="flex flex-col items-end justify-between gap-2">
          <div>
            <SetStatusButtons id={data.id} status={data.status} />
          </div>

          <div className="flex items-center justify-end gap-2">
            <BookDialog id={data.id} />
            <DeleteBookDialog description={deleteDescription} id={data.id} />
          </div>
        </div>

      )
    },
  },
]


