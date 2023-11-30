import ContentViewer from "@/app/admin/articles/[articleId]/preview/content-viewer";
import { Button } from "@/components/ui/button";
import { getArticleDAO } from "@/services/article-services";
import { Download } from "lucide-react";
import Link from "next/link";
import ReportCard from "../report-card";

type Props = {
    params: {
        articleId: string
    }
}
export default async function ArticleView({ params }: Props) {
    const articleId = params.articleId
    const article = await getArticleDAO(articleId);
    if (!article) {
        return <div className="text-center mt-10">Article not found</div>
    }
    if (article.status !== "published")
        return <div className="text-center mt-10">Article not published</div>
    if (!article.content)
        return <div className="text-center mt-10">Article has no content</div>

    const files = article.files || []

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center max-w-6xl justify-self-center items-center p-1 md:p-4 xl:p-8  space-y-2">
                <ReportCard article={article} />

                <ContentViewer content={article.content} />            

                <div className="grid gap-2">
                        {
                            files.map((file) => {
                                const format= file.format ? "." + file.format : ""
                                const fileName = file.original_filename + format
                                return (
                                <Link key={file.id} href={file.secure_url} target="_blank">
                                    <Button className="space-x-2 w-full" variant="link">
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
