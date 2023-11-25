import { getArticleDAO } from "@/services/article-services";
import NovelOnClient from "./editor-on-client";

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
        <main className="flex flex-col items-center justify-between sm:p-4 xl:p-8">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
                {article.title}
            </h1>
            <NovelOnClient articleId={articleId} initialContent={article.content} />
        </main>
    )
}