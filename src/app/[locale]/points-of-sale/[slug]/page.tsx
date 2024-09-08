import ContentViewer from "@/app/admin/articles/[articleId]/preview/content-viewer";
import { Button } from "@/components/ui/button";
import { getArticleDAO, getArticlesDAOBySlug } from "@/services/article-services";
import { CornerLeftUp, Download, MoveRight } from "lucide-react";
import Link from "next/link";
import ReportCard from "../report-card";
import { getScopedI18n } from "@/locales/server";

type Props = {
    params: {
        slug: string
    }
}
export default async function ArticleView({ params }: Props) {
    const slug = params.slug
    const article = await getArticlesDAOBySlug(slug)
    if (!article) {
        return <div className="text-center mt-10">Article not found</div>
    }
    if (article.status !== "published")
        return <div className="text-center mt-10">Article not published</div>
    if (!article.content)
        return <div className="text-center mt-10">Article has no content</div>

    const files = article.files || []

    const t = await getScopedI18n("wineries")

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center max-w-6xl justify-self-center items-center p-1 md:p-4 xl:p-8  space-y-2">
                <ReportCard article={article} h1/>

                <div className="w-full">
                    <ContentViewer content={article.content} />            
                </div>

                <Link href="/wineries" className="self-start">
                    <Button variant="outline" className="flex items-center gap-1"><CornerLeftUp />{t("back_button")}</Button>
                </Link>

            </div>

        </div>
  )
}
