import { getScopedI18n } from "@/locales/server"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default async function FooterPage() {
    const t = await getScopedI18n("landing")

    return (
        <div className="text-center mb-4 mt-20 space-y-10">
            <div className="flex gap-4 w-full justify-center">
                <Link href="https://www.instagram.com/gabizimmeruy" target="_blank"><Instagram size={32}  /></Link>
                <Link href="https://www.facebook.com/gabizimmeruy" target="_blank"><Facebook size={32} /></Link>
                <Link href="https://www.linkedin.com/in/gabi-zimmer" target="_blank"><Linkedin size={32} /></Link>
            </div>
            <p>{t("footer_copyrigth")}</p>
        </div>
    )
}
