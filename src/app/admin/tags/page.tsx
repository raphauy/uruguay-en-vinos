import { getTagsDAO } from "@/services/tag-services";
import { TagDialog } from "./tag-dialogs";
import { DataTable } from "./tag-table";
import { columns } from "./tag-columns";

export default async function UsersPage() {
  const data = await getTagsDAO();

  return (
    <div className="w-full">
      <div className="flex justify-end mx-auto my-2">
        <TagDialog />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Tag" />
      </div>
    </div>
  );
}
