"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useChangeLocale, useCurrentLocale, useScopedI18n } from "@/locales/client"
import { Facebook, Instagram, Linkedin, X } from "lucide-react"
import Link from "next/link"

type Props = {
  toggle: () => void
}
export function CoolMenu({ toggle }: Props) {

  const currentLanguage = useCurrentLocale()
  const t= useScopedI18n('menu')
  const changeLocale = useChangeLocale()

  function changeLanguage(lang: "es" | "en" | "pt") {   
    changeLocale(lang)
  }

  return (
    <section className="flex flex-col min-h-screen p-4 md:p-10 lg:p-16">
      <div className="flex justify-between">
        <Button size="icon" variant="outline" onClick={toggle}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close page</span>
        </Button>
        <div>
          <Select onValueChange={changeLanguage} value={currentLanguage}>
              <SelectTrigger>
                {
                  currentLanguage === "es" && 
                  <SelectValue className="text-muted-foreground">Español</SelectValue>
                }
                {
                  currentLanguage === "en" &&
                  <SelectValue className="text-muted-foreground">English</SelectValue>                  
                }
                {
                  currentLanguage === "pt" &&
                  <SelectValue className="text-muted-foreground">Português</SelectValue>
                }
                {
                  currentLanguage === "fr" &&
                  <SelectValue className="text-muted-foreground">Français</SelectValue>
                }
                {
                  currentLanguage === "gl" &&
                  <SelectValue className="text-muted-foreground">Galego</SelectValue>
                }
                
              </SelectTrigger>
            <SelectContent id="select">
              <SelectItem value={"es"}>Español</SelectItem>
              <SelectItem value={"en"}>English</SelectItem>
              <SelectItem value={"pt"}>Português</SelectItem>
              <SelectItem value={"fr"}>Français</SelectItem>
              <SelectItem value={"gl"}>Galego</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center flex-1 pb-52 gap-10">
        <Link className="text-lg font-bold" href={`/${currentLanguage}`} onClick={toggle}>
          {t('home')}
        </Link>
        <Link className="text-lg font-bold" href={`/${currentLanguage}/presale`} onClick={toggle}>
          {t('presale')}
        </Link>
        <Link className="text-lg font-bold" href={`/${currentLanguage}/wines`} onClick={toggle}>
          {t('wines')}
        </Link>
        <Link className="text-lg font-bold" href="#">
          {t('reports')}
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link className="text-lg" href="#">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link className="text-lg" href="#">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link className="text-lg" href="#">
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
        <div className="">
          <Button variant="outline" autoFocus={true}>Dark Mode</Button>
        </div>
      </div>
    </section>
  )
}



