"use client"

import { Button } from "@/components/ui/button"
import { BookStatus } from "@prisma/client"
import { setStatusBookAction } from "./book-actions"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Loader } from "lucide-react"

type Props = {
    id: string
    status: BookStatus
}
export default function SetStatusButtons({ id, status }: Props) {
    const [loading, setLoading] = useState(false);

    const stauses= Object.values(BookStatus)
    const complementary= stauses.filter(s => s !== status)

    function onClick(status: BookStatus) {
        setLoading(true)
        setStatusBookAction(id, status)
        .then(() => {
            toast({ title: "Status updated" })
        })
        .catch((error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }
    return (
        <div className="space-y-1 flex flex-col justify-items-end w-full">
            {
                complementary.map((status) => {
                    if (loading) {
                        return <div key={status} className="w-32 h-8 flex items-center justify-center bg-green-50"><Loader className="h-5 w-5 animate-spin" /></div>
                    } else {
                        return (
                            <Button key={status} className="w-32 h-8" onClick={() => onClick(status)}>
                                {status}
                            </Button>
                        )
                    }                    
            })
            }
        </div>
    );
}