import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find the perfect freelance services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Connect with talented freelancers and get your projects done
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500 transition-colors"
              />
              <button className="bg-primary-800 hover:bg-primary-900 dark:bg-primary-700 dark:hover:bg-primary-800 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                Search
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}