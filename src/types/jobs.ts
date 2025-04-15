export interface Job {
  _id: number
  title: string
  description: string
  city: string
  date: string
  area: string
  budget: string
  timePosted: string
  landMark: string
  experience: string
  durationStartTime: string
  durationEndTime: string
  search: string
  minBudget: string
  maxBudget: string
}

export interface JobFilters {
  search: string
  type: string
  experience: string
  area: string
  city: string
  minBudget: string
  maxBudget: string
  durationStartTime: string
  durationEndTime: string
}