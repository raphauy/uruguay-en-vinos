import { getArticleDAO } from "@/services/article-services";
import NovelOnClient from "./editor-on-client";
import FilesSection from "./files";
import ImageSection from "./image";
import SummarySection from "./summary";
import { format } from "date-fns";
import ArticleCard from "./article-card";

type Props = {
    params: {
        articleId: string
    }
}
export default async function Novel({ params }: Props) {
    const { articleId } = params
    const article= await getArticleDAO(articleId);
    if (!article) {
        return <div>Article not found</div>
    }

    return (
        <main className="flex flex-col p-1 md:p-4 xl:p-8 space-y-2">
            <ArticleCard article={article} admin />

            <NovelOnClient articleId={articleId} initialContent={article.content} />

            <div className="grid lg:grid-cols-2 gap-2 w-full">
                <FilesSection articleId={articleId} />                
                <SummarySection articleId={articleId} />
            </div>
        </main>
    )
}