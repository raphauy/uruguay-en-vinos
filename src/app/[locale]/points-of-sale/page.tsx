import ContentViewer from "@/app/admin/articles/[articleId]/preview/content-viewer"
import { Button } from "@/components/ui/button"
import { getCurrentLocale, getScopedI18n } from "@/locales/server"
import { getArticlesDAOBySlug } from "@/services/article-services"
import { CornerLeftUp } from "lucide-react"
import Link from "next/link"


export default async function WineriesPage() {
    const currentLanguage = getCurrentLocale()
    console.log("currentLanguage is: ", currentLanguage) 

    const article = await getArticlesDAOBySlug("puntos-de-venta")
    if (!article) {
        return <div className="text-center mt-10">Article not found</div>
    }
    if (article.status !== "published")
        return <div className="text-center mt-10">Article not published</div>
    if (!article.content)
        return <div className="text-center mt-10">Article has no content</div>

    const t = await getScopedI18n("landing")

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center max-w-6xl justify-self-center items-center p-1 md:p-4 xl:p-8  space-y-2">

                <div className="w-full">
                    <ContentViewer content={article.content} />            
                </div>

                <Link href="/" className="self-start">
                    <Button variant="outline" className="flex items-center gap-1"><CornerLeftUp />{t("pos_home_button")}</Button>
                </Link>

            </div>

        </div>
  )
}
