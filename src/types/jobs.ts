export interface Job {
  id: number
  title: string
  description: string
  type: string
  area: string
  budget: string
  timePosted: string
  skills: string[]
  experience: string
  durationStartTime: string
  durationEndTime: string
}

export interface JobFormData {
  title: string
  description: string
  budget: string
  date: string
  area: string
  city: string
  landMark: string
  durationStartTime: string
  durationEndTime: string
}

export interface JobFilters {
  search: string
  type: string
  experience: string
  area: string
  minBudget: string
  maxBudget: string
  durationStartTime: string
  durationEndTime: string
}