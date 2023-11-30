import { getArticlesDAOByCategory } from "@/services/article-services"
import Link from "next/link"
import ReportCard from "./report-card"
import { getCurrentLocale, getScopedI18n } from "@/locales/server"


export default async function ReportsPage() {
    const informesCategoryIdEs= process.env.INFORMES_CATEGORY_ID_ES
    const informesCategoryIdEn= process.env.INFORMES_CATEGORY_ID_EN

    const currentLanguage = getCurrentLocale()
    console.log("currentLanguage is: ", currentLanguage) 

    let articles= null

    if (currentLanguage === "es") {
        if(!informesCategoryIdEs) return <div className="text-center mt-10">No hay informes en español</div>
        articles= await getArticlesDAOByCategory(informesCategoryIdEs)
    } else {
        if(!informesCategoryIdEn) return <div className="text-center mt-10">No reports in English</div>
        articles= await getArticlesDAOByCategory(informesCategoryIdEn)
    }


    const publishedArticles= articles.filter((article) => article.status === "published")

    const t = await getScopedI18n("reports")

    return (
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8  space-y-2">
            <h1 className="my-5 text-4xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
                {t("title")}
            </h1>
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8  space-y-2">
                {publishedArticles.map((article)=> {
                    return(
                        <Link key={article.id} href={`/reports/${article.id}`} className="w-full h-full">
                            <ReportCard article={article} />
                        </Link> 
                    )})
                }
            </div>
        </div>
    )
}
