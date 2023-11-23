import { Button } from '@/components/ui/button'
import { getScopedI18n } from '@/locales/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const t = await getScopedI18n('landing')

  return (
    <div className='flex flex-col items-center gap-10 mt-10'>
      <h1 className='text-2xl font-bold'>Uruguay en Vinos</h1>

      <Link href="/login"><Button>Login</Button></Link>
    </div>
  )
}
