"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CategoryDAO } from "@/services/category-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getCategoriesDAOAction } from "../categorys/category-actions";
import {
  createArticleAction,
  deleteArticleAction,
  publishUnpublishArticleAction
} from "./article-actions";

export const titleFormSchema = z.object({
	title: z.string({required_error: "Title is required."}),
  categoryId: z.string().optional(),
})
export type TitleFormValues = z.infer<typeof titleFormSchema>

type Props = {
  closeDialog: () => void;
};

export function ArticleForm({ closeDialog }: Props) {
  const form = useForm<TitleFormValues>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryDAO[]>([])

  useEffect(() => {
    getCategoriesDAOAction()
    .then((categories) => {
      setCategories(categories)
    })
    .catch((error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    })
  }, [])
  

  const onSubmit = async (data: TitleFormValues) => {
    setLoading(true)
    createArticleAction(data.title, data.categoryId)
    .then(() => {
      toast({ title: "Article created" })
    })
    .catch((error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    })
    .finally(() => {
      setLoading(false)
      closeDialog()
    });
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Article's title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                  <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {
                      field.value ? 
                      <SelectValue className="text-muted-foreground">{categories.filter(category => category.id === field.value)[0].name}</SelectValue> :
                      <SelectValue className="text-muted-foreground" placeholder="Selecciona una Categoría" />
                    }
                    
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


          <div className="flex justify-end">
            <Button
              onClick={() => closeDialog()}
              type="button"
              variant={"secondary"}
              className="w-32"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-32 ml-2">
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <p>Save</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

type DeleteProps = {
  id?: string;
  closeDialog: () => void;
};
export function DeleteArticleForm({ id, closeDialog }: DeleteProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!id) return;
    setLoading(true);
    deleteArticleAction(id)
      .then(() => {
        toast({ title: "Article deleted" });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
        closeDialog && closeDialog();
      });
  }

  return (
    <div>
      <Button
        onClick={() => closeDialog && closeDialog()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancelar
      </Button>
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="w-32 ml-2 gap-1"
      >
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        Delete
      </Button>
    </div>
  );
}

type PublishUnpublishProps = {
  id: string;
  publish: boolean;
  closeDialog: () => void;
};

export function PublishUnpublishForm({ id, publish, closeDialog }: PublishUnpublishProps) {
  const [loading, setLoading] = useState(false);

  async function handlePublishUnpublish() {
    setLoading(true);
    publishUnpublishArticleAction(id, publish)
    .then(() => {
      toast({ title: "Article updated" });
      closeDialog()
    })
    .catch((error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    })
    .finally(() => {
      setLoading(false);
    });

  }

  return (
    <div>
      <Button
        onClick={() => handlePublishUnpublish()}
        variant="destructive"
        className="w-32 ml-2 gap-1"
      >
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        {publish ? "Publish" : "Unpublish"}
      </Button>
    </div>
  );
}