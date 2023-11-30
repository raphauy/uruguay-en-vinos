import { getArticlesDAO } from "@/services/article-services";
import { ArticleDialog } from "./article-dialogs";
import { DataTable } from "./article-table";
import { columns } from "./article-columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function UsersPage() {
  const data = await getArticlesDAO();

  return (
    <div className="w-full">
      <div className="flex justify-end mx-auto my-2">
        <ArticleDialog />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Article" columnsOff={["slug", "content", "status"]}/>
      </div>
    </div>
  );
}


