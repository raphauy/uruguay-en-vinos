"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { zodResolver } from "@hookform/resolvers/zod"
import { Wine } from "@prisma/client"
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const wineStyles= [
  "Sparkling",
  "White",
  "Orange",
  "Rosé",
  "Red",
  "Fortified"
]

const formSchema = z.object({
  winery: z.string()
    .min(2, { message: "Winery must be at least 2 characters." }),
  wine: z.string()
    .min(2, { message: "Name must be at least 2 characters." }),
  winemaker: z.string().optional(),
  region: z.string()
    .min(2, { message: "Region must be at least 2 characters." }),
  vintage: z.string({required_error: "Vintage is required."}),
  grapes: z.string()
    .min(2, { message: "Grapes must be at least 2 characters." }),
  style: z.string().optional(),
  notes: z.string().optional(),
  price: z.string().optional(),
  image: z.string().optional(),
})

export type WineFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<WineFormValues> = {}

interface Props{
  wine?: Wine
  processData: (json: WineFormValues) => Promise<Wine | null>
}

export function WineForm({ wine, processData }: Props) {
  const [placeHolderImageUrl, setPlaceHolderImageUrl] = useState("wines/wine-placeholder.jpg")
  const form = useForm<WineFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  const placeHolderImage = new CloudinaryImage(placeHolderImageUrl, {cloudName: 'dtm41dmrz'})

  async function onSubmit(data: WineFormValues) {
    
    const fresh= await processData(data)

    let message= "Vino creado 🏁"
    if (wine)
      message= "Vino editado 🏁"
      
      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-xl text-white">{message}</p>
          </pre>
        ),
      })
  
    fresh && router.push(`/admin/wines?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (wine) {
      
      form.setValue("winery", wine.winery)
      form.setValue("wine", wine.wine)
      wine.winemaker && form.setValue("winemaker", wine.winemaker)
      form.setValue("region", wine.region)
      form.setValue("vintage", wine.vintage)
      form.setValue("grapes", wine.grapes)
      wine.style && form.setValue("style", wine.style)
      wine.notes && form.setValue("notes", wine.notes)
      wine.price && form.setValue("price", wine.price)
      wine.image && form.setValue("image", wine.image)
      wine.image && setPlaceHolderImageUrl(wine.image.split("/").slice(-2).join("/"))
    }
  
  }, [form, wine])

  function handleUpload(result: any) {
    const img: string = result.info.secure_url;
    form.setValue("image", img);
    setPlaceHolderImageUrl(img.split("/").slice(-2).join("/"))
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8 bg-white border rounded-md">

        <div className="grid md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="wine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wine</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vintage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vintage</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="winery"         
            render={({ field }) => (
              <FormItem>
                <FormLabel>Winery</FormLabel>
                <FormControl>
                  <Input placeholder="Winery name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="Region of the wine" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grapes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grapes</FormLabel>
                <FormControl>
                  <Input placeholder="Tannat, Cabernet franc, Petit Verdot." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wine Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      {
                        wine ? 
                        <SelectValue className="text-muted-foreground">{form.getValues("style")}</SelectValue> :
                        <SelectValue className="text-muted-foreground" placeholder="Select a Wine Style (Optional)" />
                      }
                      
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wineStyles.map(style => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="winemaker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Winemaker</FormLabel>
                <FormControl>
                  <Input placeholder="(optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Average price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tasting notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="(optional)"                  
                  {...field}
                  rows={7}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormItem>
          <FormLabel>Image</FormLabel>
        </FormItem>
        <div className="flex justify-center w-40">
          <CldUploadButton
            options={{maxFiles: 1, tags: ["uruguay-in-wines",]}}
            onUpload={handleUpload}
            uploadPreset="tinta-wines"
          >
            <AdvancedImage cldImg={placeHolderImage} />
          </CldUploadButton>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
          <Button type="submit" className="w-32 ml-2" >Save</Button>
        </div>
      </form>
    </Form>
  )
}