import { getArticlesDAOByCategory } from "@/services/article-services"
import Link from "next/link"
import ReportCard from "./report-card"


export default async function ReportsPage() {
    const informesCategoryId= process.env.INFORMES_CATEGORY_ID
    if(!informesCategoryId) return null
    
    const articles= await getArticlesDAOByCategory(informesCategoryId)
    const publishedArticles= articles.filter((article) => article.status === "published")

    return (
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8  space-y-2">
            <h1 className="my-5 text-4xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
                Informes
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
