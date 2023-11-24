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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { processMessageAction } from "./mensaje-actions";
import { useScopedI18n } from "@/locales/client";

export const mensajeFormSchema = z.object({
	name: z.string().optional(),
	email: z.string({required_error: "Field required."}).email({message: "Email is not valid."}),
	content: z.string().optional(),
})
export type MensajeFormValues = z.infer<typeof mensajeFormSchema>

export function MensajeForm() {
  const t = useScopedI18n('presale')

  const form = useForm<MensajeFormValues>({
    resolver: zodResolver(mensajeFormSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false)

  const onSubmit = async (data: MensajeFormValues) => {
    setLoading(true)
    processMessageAction(data)
    .then(() => {
      toast({ title: t("form_success") })
      setEnviado(true)
    })
    .catch((error: any) => {
      toast({
        title: t("form_error"),
        variant: "destructive",
      });
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="p-4 mt-10 text-left">
      <div className={cn("border gap-8 flex flex-col items-center border-gray-500 p-10 h-40 rounded-lg", !enviado && "hidden")}>
        <p className="flex items-center gap-4 text-2xl">{t("form_success")} <CheckCircle2 color="green" /></p>
        <p>{t("form_thanks")}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 md:min-w-[500px]", enviado && "hidden")}>

          <div className="flex gap-2 w-full">
            <FormField            
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("form_name")}</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("form_email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form_message")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("form_message_placeholder")} {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" className="px-7 mt-4 w-40 pt-2 font-bold">
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <p className="whitespace-nowrap">{t("form_button")}</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

