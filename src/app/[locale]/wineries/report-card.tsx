import ImageSection from "@/app/admin/articles/[articleId]/image";
import { ArticleDAO } from "@/services/article-services";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
    article: ArticleDAO
    admin?: boolean
    h1?: boolean
}
export default async function ReportCard({ article, admin, h1 }: Props) {

    const categories= article.categories

    const date= format(new Date(article.createdAt), "dd/MM/yyyy")
    const image= article.image || "/article-placeholder.png"

    return (
        <div className="flex justify-between h-full w-full items-center border rounded-lg p-4 lg:min-w-[1000px]"> 
            { !admin && <Image src={image} width={150} height={100} alt="Article Image" className="rounded-lg hidden md:block"/>}
            { admin && <ImageSection articleId={article.id} />}
            <div className="flex flex-col gap-3 px-2 md:px-4 max-w-2xl min-h-[200px] flex-grow">
                {
                    h1 ? 
                    <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
                        {article.title}
                    </h1> :
                    <h2 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
                        {article.title}
                    </h2>
            }

                <p className="flex-1">
                    {article.summary}
                </p>
            </div>

            <div className="flex flex-col items-end justify-between min-h-[200px]">
                <div className="text-right">
                    <div className="text-gray-500 text-sm">
                        {article.authorName}
                    </div>
                </div>
                <div>
                {
                    categories?.map((category) => (
                        <div key={category.id} className="bg-naranja text-verde-oscuro px-4 rounded-full font-bold">
                            {category.name}
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}