import { getArticleDAO } from "@/services/article-services";
import ContentViewer from "./content-viewer";

type Props = {
    params: {
        articleId: string
    }
}
export default async function ArticlePreview({ params }: Props) {
    const articleId = params.articleId
    const article = await getArticleDAO(articleId);
    if (!article) {
        return <div>Article not found</div>
    }
    const editorProps = {
        editable: () => false
    };

    return (
        <div className="max-w-5xl space-y-10 mt-5">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
                {article.title}
            </h1>

            <ContentViewer content={article.content} />            

        </div>
  )
}
