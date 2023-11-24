import Link from "next/link"

import getWines, { getGrapes, getRegions, getVintages } from "@/services/wine-services"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "./data-table"
import { columns } from "./columns"
 
export default async function WinesPage() {
  
  const wines= await getWines()
  const regions= await getRegions()
  const grapes= await getGrapes()
  const vintages= await getVintages()

  return (
    <div className="w-full">      

      <div className="flex justify-end my-5 text-lg font-semibold">
        <Link href={`/admin/wines/add`} 
          className="flex items-center justify-center">
          <Button><PlusCircle size={22} className="mr-2"/>Add</Button>
        </Link>
      </div>

      <div className="container p-3 py-10 mx-auto border rounded-md">
        <DataTable columns={columns} data={wines} columnsOff={["winemaker", "price", "region", "vintage", "style"]} 
          regions={regions} 
          grapes={grapes}
          vintages={vintages}
        />
      </div>
    </div>
)
}
