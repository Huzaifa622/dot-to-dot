import Image from 'next/image'
import { Inter } from 'next/font/google'
import DotMatching from '@/components/DotMatching'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
   <DotMatching/>
   </>
  )
}
