import { Wine } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Separator } from "@/components/ui/separator";
import { WineForm, WineFormValues } from "../add/wineForm";
import { editWine, getWine } from "@/services/wine-services";


export const revalidate= 0

interface Props{
    params: {
        slug: string
    },
    searchParams: {
        wineId: string
    },
  }  

export default async function AddWinePage({ params, searchParams }: Props) {
    
    const wineId= searchParams.wineId
    const wine= await getWine(wineId)

    if (!wine) return <div>Wine not found, id: {wineId}</div>
 

    async function editData(data: WineFormValues): Promise<Wine | null> {
    "use server"

    const edited= await editWine(wineId, data)    

    revalidatePath("/admin/wines")
    
    return edited
    }

    return (
    <div className="flex flex-col items-center w-full max-w-4xl my-10 space-y-6">
        <div className="min-w-[600px]">
        <h3 className="text-lg font-medium text-center">Agregar Vino</h3>

        <Separator className="my-5" />

        <div className="w-full">
            <WineForm processData={editData} wine={wine} />        
        </div>
        
        </div>
        
    </div>
    )
}