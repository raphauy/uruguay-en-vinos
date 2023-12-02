"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeftRight, ArrowUp, ArrowUpDown, ChevronsLeft, ChevronsRight, Loader, Pencil, PlusCircle, Trash2 } from "lucide-react";
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
import { CategoryDAO } from "@/services/category-services";
import { getArticleDAOAction, getComplentaryCategorysAction, setCategorysAction } from "./article-actions";
import { toast } from "@/components/ui/use-toast";

type Props = {
  id?: string;
  create?: boolean;
};

const addTrigger = (
  <Button variant="outline">
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
        <ArticleForm closeDialog={() => setOpen(false)} id={id} />
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
          <Button variant="outline">
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


interface CollectionProps{
  id: string
  title: string
}

    
export function CategorysDialog({ id, title }: CollectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ArrowLeftRight className="hover:cursor-pointer mr-2" />
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ArticleCategorysBox closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  );
}      

interface CategorysBoxProps{
  id: string
  closeDialog: () => void
}

export function ArticleCategorysBox({ id, closeDialog }: CategorysBoxProps) {

  const [loading, setLoading] = useState(false)
  const [categorys, setCategorys] = useState<CategoryDAO[]>([])
  const [complementary, setComplementary] = useState<CategoryDAO[]>([])

  useEffect(() => {
      getArticleDAOAction(id)
      .then((data) => {
          if(!data) return null
          if (!data.categories) return null
          console.log(data.categories)            
          setCategorys(data.categories)
      })
      getComplentaryCategorysAction(id)
      .then((data) => {
          if(!data) return null
          setComplementary(data)
      })
  }, [id])

  function complementaryIn(id: string) {
      const comp= complementary.find((c) => c.id === id)
      if(!comp) return
      const newComplementary= complementary.filter((c) => c.id !== id)
      setComplementary(newComplementary)
      setCategorys([...categorys, comp])
  }

  function complementaryOut(id: string) {            
      const comp= categorys.find((c) => c.id === id)
      if(!comp) return
      const newComplementary= categorys.filter((c) => c.id !== id)
      setCategorys(newComplementary)
      setComplementary([...complementary, comp])
  }

  function allIn() {
      setCategorys([...categorys, ...complementary])
      setComplementary([])
  }

  function allOut() {
      setComplementary([...complementary, ...categorys])
      setCategorys([])
  }

  async function handleSave() {
      setLoading(true)
      setCategorysAction(id, categorys)
      .then(() => {
          toast({ title: "Categorys updated" })
          closeDialog()
      })
      .catch((error) => {
          toast({ title: "Error updating categorys" })
      })
      .finally(() => {
          setLoading(false)
      })
  }

  return (
      <div>
          <div className="grid grid-cols-2 gap-4 p-3 border rounded-md min-w-[400px] min-h-[300px]">
              <div className="flex flex-col border-r">
              {
                  categorys.map((item) => {
                  return (
                      <div key={item.id} className="flex items-center justify-between gap-2 mb-1 mr-5">
                          <p className="whitespace-nowrap">{item.name}</p>
                          <Button variant="secondary" className="h-7" onClick={() => complementaryOut(item.id)}><ChevronsRight /></Button>
                      </div>
                  )})
              }
                      <div className="flex items-end justify-between flex-1 gap-2 mb-1 mr-5">
                          <p>Todos</p>
                          <Button variant="secondary" className="h-7" onClick={() => allOut()}><ChevronsRight /></Button>
                      </div>
              </div>
              <div className="flex flex-col">
              {
                  complementary.map((item) => {
                  return (
                      <div key={item.id} className="flex items-center gap-2 mb-1">
                          <Button variant="secondary" className="h-7 x-7" onClick={() => complementaryIn(item.id)}>
                              <ChevronsLeft />
                          </Button>
                          <p className="whitespace-nowrap">{item.name}</p>
                      </div>
                  )})
              }
                  <div className="flex items-end flex-1 gap-2 mb-1">
                      <Button variant="secondary" className="h-7" onClick={() => allIn()}><ChevronsLeft /></Button>
                      <p>Todos</p>
                  </div>
              </div>
          </div>

          <div className="flex justify-end mt-4">
              <Button type="button" variant={"secondary"} className="w-32" onClick={() => closeDialog()}>Cancelar</Button>
              <Button onClick={handleSave} className="w-32 ml-2" >{loading ? <Loader className="animate-spin" /> : <p>Save</p>}</Button>
          </div>
      </div>
  )
} 

