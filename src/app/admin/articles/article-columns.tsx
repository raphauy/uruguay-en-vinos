"use client";

import { Button } from "@/components/ui/button";
import { ArticleDAO } from "@/services/article-services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteArticleDialog, PublishUnpublishDialog } from "./article-dialogs";

export const columns: ColumnDef<ArticleDAO>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return null
    },
    cell: ({ row }) => {
      const data = row.original     

      if (!data.image) return null


      return (
        <Link href={`/admin/articles/${data.id}`}>
          <Image src={data.image} width={150} height={150} className="w-80 rounded-md" alt={data.title} />
        </Link>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Link href={`/admin/articles/${data.id}`} className="">
          <Button variant="ghost" className="px-0">{data.title}</Button>
        </Link>
    );
    },
  },

  {
    accessorKey: "summary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Summary
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex flex-col justify-between gap-10">
          <p>{data.summary}</p>

          <p className="self-center">{data.status}</p>
      </div>
    );
    },
  },

  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  {
    accessorKey: "categories",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categories
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div>
          {
              data.categories?.map((category) => (
                  <div key={category} className="bg-naranja text-verde-oscuro w-fit px-4 rounded-full font-bold">
                      {category}
                  </div>
              ))
          }
        </div>
);
    }
  },

  {
    accessorKey: "authorName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  // {
  //   accessorKey: "role",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" className="pl-0 dark:text-white"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Rol
  //         <ArrowUpDown className="w-4 h-4 ml-1" />
  //       </Button>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      const description = `Do you want to delete Article ${data.title}?`;

      const publish= data.status !== "published" ? true : false
      return (
        <div className="flex items-center justify-end gap-2">
          <PublishUnpublishDialog id={data.id} publish={publish} title={data.title} />
          <Link href={`/admin/articles/${data.id}`}>
            <Button variant="ghost"><Eye  /></Button>
          </Link>
          <DeleteArticleDialog description={description} id={data.id} />
        </div>
      );
    },
  },
];
