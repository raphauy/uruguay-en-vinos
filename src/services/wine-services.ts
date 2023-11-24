import { WineFormValues } from "@/app/admin/wines/add/wineForm";
import { prisma } from "@/lib/db";

export default async function getWines() {

  const found = await prisma.wine.findMany({
    orderBy: {
      vintage: 'asc',
    },
  })

  return found;
};

export async function getGrapes() {
  const wines = await prisma.wine.findMany({ select: { grapes: true } }); 

  const all = wines.map(wine => wine.grapes);
  
  const uniques = Array.from(new Set(all));

  return uniques;
}

export async function getRegions() {
  const wines = await prisma.wine.findMany({ select: { region: true } }); 

  const all = wines.map(wine => wine.region);
  
  const uniques = Array.from(new Set(all));

  return uniques;
}

export async function getVintages() {
  const wines = await prisma.wine.findMany({ select: { vintage: true } }); 

  const all = wines.map(wine => wine.vintage);
  
  const uniques = Array.from(new Set(all));

  return uniques;
}

  
export async function getWine(id: string) {

  const found = await prisma.wine.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function createWine(data: WineFormValues) {
  
  const created= await prisma.wine.create({
    data
  })

  return created
}

export async function editWine(id: string, data: WineFormValues) {
  console.log(data);
  
  const created= await prisma.wine.update({
    where: {
      id
    },
    data
  })

  return created
}

export async function deleteWine(id: string) {
  
  const deleted= await prisma.wine.delete({
    where: {
      id
    },
  })

  return deleted
}