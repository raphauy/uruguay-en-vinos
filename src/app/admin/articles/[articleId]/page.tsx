import ReportCard from "@/app/[locale]/reports/report-card";
import { getArticleDAO } from "@/services/article-services";
import NovelOnClient from "./editor-on-client";
import FilesSection from "./files";
import SummarySection from "./summary";

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
            <ReportCard article={article} admin />

            <NovelOnClient articleId={articleId} initialContent={article.content} />

            <div className="grid lg:grid-cols-2 gap-2 w-full">
                <FilesSection articleId={articleId} />                
                <SummarySection articleId={articleId} />
            </div>
        </main>
    )
}