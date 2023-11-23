import FooterPage from './footer'
import LocaleSwitcher from './locale-switcher'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen w-full text-verde-oscuro">
      <div className="flex w-full justify-end p-4">
        <LocaleSwitcher />
      </div>

      <main className="flex-grow">{children}</main>
      
      <FooterPage />
    </div>
  )
}
