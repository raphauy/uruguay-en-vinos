import { getArticlesDAOByCategory } from "@/services/article-services"
import Link from "next/link"
import ReportCard from "./report-card"
import { getCurrentLocale, getScopedI18n } from "@/locales/server"
import { getCategoryDAOByName } from "@/services/category-services"


export default async function WineriesPage() {
    const currentLanguage = getCurrentLocale()
    console.log("currentLanguage is: ", currentLanguage) 

    let articles= null

    if (currentLanguage === "es") {
        const wineriesCategoryEs= await getCategoryDAOByName("Bodegas")
        if(!wineriesCategoryEs) return <div className="text-center mt-10">No se encontró la categoría Bodegas</div>
        articles= await getArticlesDAOByCategory(wineriesCategoryEs.id)
        console.log("articles is: ", articles)
        
    } else {
        const wineriesCategoryEn= await getCategoryDAOByName("Wineries")
        if(!wineriesCategoryEn) return <div className="text-center mt-10">Wineries category not found</div>
        articles= await getArticlesDAOByCategory(wineriesCategoryEn.id)
    } 


    const publishedArticles= articles.filter((article) => article.status === "published")

    const t = await getScopedI18n("wineries")

    return (
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8  space-y-2">
            <h1 className="my-5 text-4xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
                {t("title")}
            </h1>
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8  space-y-2">
                {publishedArticles.map((article)=> {
                    return(
                        <Link key={article.id} href={`/wineries/${article.slug}`} className="w-full h-full">
                            <ReportCard article={article} />
                        </Link> 
                    )})
                }
            </div>
        </div>
    )
}
