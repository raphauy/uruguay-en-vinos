import { Button } from "@/components/ui/button"
import { getScopedI18n } from "@/locales/server"
import { cn } from "@/lib/utils"
import { jostMedium, fontSpaceMono } from "@/lib/fonts"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const t = await getScopedI18n("landing")

  return (
    <div className="flex flex-col items-center gap-5 mt-10 w-full">
      <h1 className="text-2xl font-bold">
        <p className={cn(jostMedium.className, "uppercase text-azul text-6xl")}>Uruguay</p>
        <p className={cn(fontSpaceMono.className, "text-[3.4rem]")}>{t("in_wines")}</p>
      </h1>
      <h2 className={cn(jostMedium.className, "text-[1.6rem]")}>
        <p>{t("sub_title1")}</p>
        <p className="text-center">{t("sub_title2")}</p>
      </h2>

      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] my-5 overflow-hidden flex items-center justify-center">
        <Image src="/viñedo_familia.jpg" width={2818} height={1000} alt="Viñedo de la familia" />
      </div>

      <p className="sm:w-[580px] text-center text-xl">{t("desc")}</p>

      {/** Book */}
      <div className="grid md:grid-cols-[2fr_1.4fr] lg:grid-cols-[2fr_1.4fr] max-w-3xl gap-3 lg:gap-8 my-10 mx-4 md:mx-10 text-center md:text-left">
        <Image src="/libro_portada.jpg" width={1600} height={1000} alt={t("book")}/>
        <div className="flex flex-col justify-between items-center md:items-start">
          <div>
            <p className={cn(jostMedium.className, "text-2xl uppercase mb-3")}>{t("book")}</p>
            <p>{t("book_actual")}</p>
          </div>

          <Link href="/presale">
            <Button className="w-32 uppercase rounded-3xl bg-verde-oscuro mt-3">{t("button_lo_quiero")}</Button>
          </Link>
        </div>
      </div>

      {/** Discover */}
      <div className="grid md:grid-cols-[1.4fr_2fr] max-w-3xl gap-8 my-10 mx-4 md:mx-10 text-center md:text-left">
        <div className="flex flex-col justify-between items-center md:items-start">
          <div>
            <p className={cn(jostMedium.className, "text-2xl uppercase mb-3")}>{t("discover_title")}</p>
            <p>{t("discover_text")}</p>
          </div>

          <Link href="/wines">
            <Button className="w-32 uppercase rounded-3xl bg-verde-oscuro mt-3">{t("discover_button")}</Button>
          </Link>

        </div>
        <Link href="/wines">
          <Image src="/descubrir.png" width={662} height={300} alt={t("discover_title")} />
        </Link>
      </div>

      {/** Reports */}
      <div className="grid md:grid-cols-[2fr_1fr] max-w-3xl gap-8  my-10 mx-4 md:mx-10 text-center md:text-left">
        <Image src="/informes.png" width={1600} height={1000} alt={t("report_title")} />
        <div className="flex flex-col justify-between items-center md:items-start">
          <div>
            <p className={cn(jostMedium.className, "text-2xl uppercase mb-3")}>{t("report_title")}</p>
            <p>{t("report_text")}</p>
          </div>

          <Button className="w-32 uppercase rounded-3xl bg-verde-oscuro mt-3">{t("report_button")}</Button>

        </div>
      </div>

      {/** Suscribe */}
      <div className="grid md:grid-cols-[1fr_2.6fr] max-w-3xl gap-8 my-10 mx-4 md:mx-10">
        <div className="flex flex-col justify-between items-center md:items-start">
          <div className="text-center md:text-left">
            <p className={cn(jostMedium.className, "text-2xl uppercase mb-3")}>{t("suscribe_title")}</p>
            <p>{t("suscribe_text1")}</p>
            <p>{t("suscribe_text2")}</p>
            <p>{t("suscribe_text3")}</p>
            <p>{t("suscribe_text4")}</p>
            <p>{t("suscribe_text5")}</p>
          </div>

          <Button className="w-32 uppercase rounded-3xl bg-verde-oscuro mt-3">{t("suscribe_button")}</Button>

        </div>
        <Image src="/uvas_blancas.jpg" width={662} height={300} alt={t("suscribe_title")} />
      </div>


    </div>
  )
}
