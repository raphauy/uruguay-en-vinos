import { BookDialog } from "./book-dialogs"
import { DataTable } from "./book-table"
import { columns } from "./book-columns"
import { getBooksDAO } from "@/services/book-services"

export default async function BookPage() {
  
  const data= await getBooksDAO()
  const cities= data.map(book => book.city.trim())
  const uniqueCities= Array.from(new Set(cities))

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <BookDialog />
      </div>

      <div className="container bg-white p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white dark:bg-black">
        <DataTable columns={columns} data={data} subject="Book" cities={uniqueCities}/>
      </div>
    </div>
  )
}
  
