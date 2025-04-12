import { JobFilters as FilterType } from '@/types/jobs'
import { Search, SlidersHorizontal } from 'lucide-react'
import Input from '../ui/Input'

interface JobFiltersProps {
  filters: FilterType
  updateFilter: (key: keyof FilterType, value: string) => void
}

export function JobFilters({ filters, updateFilter }: JobFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        <Input
          icon={Search}
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Experience Level
          </label>
          <select
            value={filters.experience}
            onChange={(e) => updateFilter('experience', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <Input
            placeholder="e.g. Remote, New York"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
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