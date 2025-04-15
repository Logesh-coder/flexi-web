import { Job } from '@/types/jobs'
import { SlidersHorizontal } from 'lucide-react'
import Input from '../ui/Input'

interface JobFiltersProps {
  filters: Job
  updateFilter: any
}

export function JobFilters({ filters, updateFilter }: JobFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City
          </label>
          <Input
            placeholder="e.g. Remote, chennai"
            value={filters.city}
            onChange={(e) => updateFilter('city', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Area
          </label>
          <Input
            placeholder="e.g. Remote, chennai"
            value={filters.area}
            onChange={(e) => updateFilter('area', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Min"
              value={filters.minBudget}
              onChange={(e) => updateFilter('minBudget', e.target.value)}
            />
            <Input
              placeholder="Max"
              value={filters.maxBudget}
              onChange={(e) => updateFilter('maxBudget', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}