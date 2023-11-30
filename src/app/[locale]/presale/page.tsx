import { getScopedI18n } from "@/locales/server"
import { MensajeForm } from "./mensaje-forms"

export default async function PreventaPage() {

    const t = await getScopedI18n("presale")
    
    return (
        <div className="flex justify-center w-full mt-10">
            <div className="max-w-3xl text-center space-y-5">
                <h1 className="text-3xl font-bold">{t(`title`)}</h1>
                <p className="text-lg">{t(`description`)}</p>

                <MensajeForm />
            </div>

        </div>
    )
}
