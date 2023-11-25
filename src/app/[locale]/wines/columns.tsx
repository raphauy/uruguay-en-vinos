"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"

export type Wine = {
  id: string
  winery: string
  wine: string
  winemaker: string
  region: string
  vintage: string
  grapes: string
  style: string
  price: string
  notes: string
  image: string | null
}

export const columns: ColumnDef<Wine>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return null
    },
    cell: ({ row }) => {
      const wine = row.original     

      if (!wine.image) return null


      return (
        <div>          
          <Image src={wine.image} width={150} height={150} className="rounded-md" alt={wine.wine} />
        </div>
      )
    },
  },
  {
    accessorKey: "wine",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Wine
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const wine = row.original     

      return (
        <div className="">          
          <p className="font-bold">{wine.wine}</p>
          <p>{wine.vintage}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "winery",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Winery
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const wine = row.original     

      return (
        <div className="">          
          <p className="whitespace-nowrap">{wine.winery}</p>
          <p>{wine.region}</p>
        </div>
      )
    },
  },
{
    accessorKey: "winemaker",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Winemaker
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Region
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "vintage",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Vintage
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "grapes",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Grapes
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "style",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Style
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Notas
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  // {
  //   id: "open",
  //   cell: ({ row }) => {
  //     const wine = row.original     

  //     return (
  //       <Link href={`/admin/wines/view?wineId=${wine.id}`} className="flex items-center">
  //           <Eye />
  //       </Link>
  //     )
  //   },
  // },

]
