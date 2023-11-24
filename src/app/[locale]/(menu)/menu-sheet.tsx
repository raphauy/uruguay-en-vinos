"use client"

import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CoolMenu } from "./cool-menu";

export function SheetMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)} >
      <SheetTrigger className="hover:opacity-75 transition duration-1000 top-4 left-4 fixed bg-background/50">
        <Menu size={30} onClick={() => setOpen(true)} className={cn(open ? "opacity-0" : "opacity-100")}/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <CoolMenu toggle={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
)
}