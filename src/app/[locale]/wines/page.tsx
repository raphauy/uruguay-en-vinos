import { DataTable } from "@/app/admin/wines/data-table"
import getWines, { getGrapes, getRegions, getVintages } from "@/services/wine-services"
import { columns } from "./columns"

export default async function IndexPage() {
  const wines= await getWines()
  const regions= await getRegions()
  const grapes= await getGrapes()
  const vintages= await getVintages()

  return (
    <div className="flex flex-col items-center w-full text-lg">
      <h1 className="my-5 text-4xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
        Wines
      </h1>

      
      <div className="container p-3 mx-auto border rounded-md">
        <DataTable columns={columns} data={wines} columnsOff={["winemaker", "price"]} 
          regions={regions} 
          grapes={grapes}
          vintages={vintages}
        />
      </div>
    </div>
  
)
}
