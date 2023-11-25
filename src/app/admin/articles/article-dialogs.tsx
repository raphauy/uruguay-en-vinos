"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArticleForm, DeleteArticleForm, PublishUnpublishForm } from "./article-forms";

type Props = {
  id?: string;
  create?: boolean;
};

const addTrigger = (
  <Button>
    <PlusCircle size={22} className="mr-2" />
    Create Article
  </Button>
);
const updateTrigger = (
  <Pencil size={30} className="pr-2 hover:cursor-pointer" />
);

export function ArticleDialog({ id }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{id ? updateTrigger : addTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? "Update" : "Create"} Article</DialogTitle>
        </DialogHeader>
        <ArticleForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

type DeleteProps = {
  id: string;
  description: string;
};

export function DeleteArticleDialog({ id, description }: DeleteProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Article</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteArticleForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  );
}

type PublishUnpublishProps = {
  id: string;
  title: string;
  publish: boolean;
};

export function PublishUnpublishDialog({id, publish, title }: PublishUnpublishProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {publish ?
          <Button >
            Publish <ArrowUp className="w-4 h-4" />
          </Button> :
          <Button variant="outline">
            UnPublish <ArrowDown className="w-4 h-4" />
          </Button>
        }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{publish ? "Publish" : "Unpublish"} Article</DialogTitle>
          <DialogDescription className="py-8">
            Do you want to {publish ? "publish" : "unpublish"} Article: {title}?
          </DialogDescription>
        </DialogHeader>
        <PublishUnpublishForm id={id} publish={publish} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}