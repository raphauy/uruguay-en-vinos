import { getArticleDAO } from "@/services/article-services";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ArticleCard from "@/app/admin/articles/[articleId]/article-card";
import ContentViewer from "@/app/admin/articles/[articleId]/preview/content-viewer";

type Props = {
    params: {
        articleId: string
    }
}
export default async function ArticleView({ params }: Props) {
    const articleId = params.articleId
    const article = await getArticleDAO(articleId);
    if (!article) {
        return <div>Article not found</div>
    }
    if (article.status !== "published")
        return <div>Article not published</div>

    const files = article.files || []

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center max-w-6xl justify-self-center items-center p-1 md:p-4 xl:p-8  space-y-2">
                <ArticleCard article={article} />

                <ContentViewer content={article.content} />            

                <div className="grid gap-2">
                        {
                            files.map((file) => {
                                const format= file.format ? "." + file.format : ""
                                const fileName = file.original_filename + format
                                return (
                                <Link key={file.id} href={file.secure_url} target="_blank">
                                    <Button className="space-x-2 w-full">
                                        <p>{fileName}</p>
                                        <Download />
                                    </Button>
                                </Link>              
                            )})
                        }
                    </div>

            </div>

        </div>
  )
}
