import { Jost, Space_Mono } from "next/font/google"

export const jostMedium = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: "500",
})

export const jostRegular = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: "400",
})

export const fontSpaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: "700",
  style: "italic",
})
