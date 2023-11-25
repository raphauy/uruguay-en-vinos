"use client"

import { Button } from "@/components/ui/button";
import { addSummary, getArticleDAO } from "@/services/article-services"
import { addSummaryAction, getArticleDAOAction } from "../article-actions";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export const summaryFormSchema = z.object({
	summary: z.string().optional(),
})
export type SummaryFormValues = z.infer<typeof summaryFormSchema>

type Props = {
    articleId: string
}

export default function SummarySection({ articleId }: Props) {

    const [loading, setLoading] = useState(false);

    const form = useForm<SummaryFormValues>({
        resolver: zodResolver(summaryFormSchema),
        defaultValues: {},
        mode: "onChange",
      });
    
    useEffect(() => {
        getArticleDAOAction(articleId)
        .then((article) => {
            if (!article) {
                return
            }
            const summary= article.summary
            if (!summary) {
                return
            }            
            form.setValue("summary", summary)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [articleId, form])
    
    const onSubmit = async (data: SummaryFormValues) => {
        if (!data.summary) {
            toast({
                title: "Error",
                description: "Summary is required",
                variant: "destructive",
            })
            return
        }
        setLoading(true);
        addSummaryAction(articleId, data.summary)
        .then((article) => {
            if (!article?.summary) {
                return
            }
            form.setValue("summary", article.summary)
            toast({title: "Summary updated"})
        })
        .catch((err) => {
            console.error(err)
            toast({
                title: "Error",
                description: err.message,
                variant: "destructive",
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }


    return (
        <div className="p-4 bg-white rounded-md border w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary:</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" className="w-40 mr-2">
                {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                ) : (
                    <p>Generate with GPT</p>
                )}
            </Button>
            <Button className="w-40">
                {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                ) : (
                    <p>Save Summary</p>
                )}
            </Button>
        </form>
      </Form>
    </div>
  )
}
