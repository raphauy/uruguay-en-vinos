"use client"

import { Wine, columns as userColumns } from '@/app/columns'
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const actionColumns: ColumnDef<Wine>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     
 
      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/wines/edit?wineId=${data.id}`} className="flex items-center">
            <Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>
          </Link>
          <Link href={`/admin/wines/delete?wineId=${data.id}`} className="flex items-center">
            <Trash2 className="text-red-400 hover:cursor-pointer"/>
          </Link>
        </div>

      )
    },
  },
]

export const columns= userColumns.concat(actionColumns)
