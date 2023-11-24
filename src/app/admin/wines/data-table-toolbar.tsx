"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { wineStyles } from "./add/wineForm"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  regions: string[]
  grapes: string[]
  vintages: string[]
}

export function DataTableToolbar<TData>({ table, regions, grapes, vintages }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col gap-1">
      <div className="grid w-full grid-cols-3 gap-1">
        <Input placeholder="Winery filter..."
            value={(table.getColumn("winery")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("winery")?.setFilterValue(event.target.value)}                
        />
        <Input placeholder="Wine filter..."
            value={(table.getColumn("wine")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("wine")?.setFilterValue(event.target.value)}                
        />
        <Input placeholder="Tasting Notes filter..." 
            value={(table.getColumn("notes")?.getFilterValue() as string ?? "")}
            onChange={(event) => table.getColumn("notes")?.setFilterValue(event.target.value)}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        {table.getColumn("style") && (
          <DataTableFacetedFilter
            column={table.getColumn("style")}
            title="Style"
            options={wineStyles}
          />
        )}
        {table.getColumn("region") && (
          <DataTableFacetedFilter
            column={table.getColumn("region")}
            title="Region"
            options={regions}
          />
        )}
        {table.getColumn("grapes") && (
          <DataTableFacetedFilter
            column={table.getColumn("grapes")}
            title="Grapes"
            options={grapes}
          />
        )}
        {table.getColumn("vintage") && (
          <DataTableFacetedFilter
            column={table.getColumn("vintage")}
            title="Vintages"
            options={vintages}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
        <DataTableViewOptions table={table}/>
      </div>


    </div>
  )
}