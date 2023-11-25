"use client";

import { Button } from "@/components/ui/button";
import { ArticleDAO } from "@/services/article-services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { DeleteArticleDialog, ArticleDialog } from "./article-dialogs";
import Link from "next/link";

export const columns: ColumnDef<ArticleDAO>[] = [
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
        <Link href={`/admin/articles/${data.id}`}>
          <Button variant="ghost" className="px-0">{data.title}</Button>
        </Link>
  );
    },
  },

  {
    accessorKey: "description",
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
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Content
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
    accessorKey: "publishedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PublishedAt
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
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

      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/articles/${data.id}`}>
            <Button variant="ghost"><Eye  /></Button>
          </Link>
          <DeleteArticleDialog description={description} id={data.id} />
        </div>
      );
    },
  },
];
