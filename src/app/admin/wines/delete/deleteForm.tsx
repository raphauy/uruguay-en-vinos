"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Wine } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  eliminate: () => Promise<Wine | null>;
}

export default function DeleteForm({ eliminate }: Props) {
  const router= useRouter()

  async function handleClick() {
    await eliminate()

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">Wine deleted</p>
        </pre>
      ),
    })

    router.push(`/admin/wines?refresh=${new Date().getMilliseconds()}`)
  }
  
  return (
    <div>
      <Button
        onClick={() => history.back()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancel
      </Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
        Delete
      </Button>
    </div>
  )
}
