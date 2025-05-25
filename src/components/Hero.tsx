import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find The Flexible Jobs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Make money make every day.
          </p>
          <div className='flex justify-center'>
            <Link href='/jobs' className="hover:bg-primary-800 border  text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
              Search
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}