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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createArticleAction,
  deleteArticleAction,
  getArticleDAOAction,
  publishUnpublishArticleAction
} from "./article-actions";

export const titleFormSchema = z.object({
	title: z.string({required_error: "Title is required."}),
})
export type TitleFormValues = z.infer<typeof titleFormSchema>

type Props = {
  id?: string
  closeDialog: () => void;
};

export function ArticleForm({ id, closeDialog }: Props) {
  const form = useForm<TitleFormValues>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("id", id);
    
    if (id) {      
      getArticleDAOAction(id).then((data) => {
        console.log("data", data)        
        if (data) {
          form.setValue("title", data.title)
        }
      })
    }
  }, [form, id])


  const onSubmit = async (data: TitleFormValues) => {
    setLoading(true)
    createArticleAction(data.title)
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
          <div className="flex justify-end">
            <Button
              onClick={() => closeDialog()}
              type="button"
              variant={"secondary"}
              className="w-32"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-32 ml-2" variant="outline">
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