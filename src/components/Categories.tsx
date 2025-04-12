'use client'

import { Code, Paintbrush, Camera, PenTool, Megaphone, LineChart } from 'lucide-react'

const categories = [
  { icon: Code, name: 'Development', count: '1.2k+ Jobs' },
  { icon: Paintbrush, name: 'Design', count: '850+ Jobs' },
  { icon: Camera, name: 'Photography', count: '600+ Jobs' },
  { icon: PenTool, name: 'Writing', count: '950+ Jobs' },
  { icon: Megaphone, name: 'Marketing', count: '750+ Jobs' },
  { icon: LineChart, name: 'Business', count: '500+ Jobs' },
]

export function Categories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <category.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}