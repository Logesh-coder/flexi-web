export interface JobUser {
  mobile: number
}

export interface Job {
  _id?: number
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
  search?: string
  minBudget?: string
  maxBudget?: string
  slug?: string
  name?: string
  isSaved?: string
  salary?: string
  domain?: string
  createUser?: JobUser
  contact?: string
  mobile?: string
  jobId?: string
  workerId?: string
}

export interface JobFilters {
  search: string
  area: string
  city: string
  minBudget: string
  maxBudget: string
  durationStartTime?: string
  durationEndTime?: string
  id?: string
  date: string
}

export interface JobFiltersProps {
  city?: string;
  area?: string;
  date?: string;
  minBudget?: string;
  maxBudget?: string;
  search?: string;
  page?: number;
  limit?: number; // <-- make it optional
  id?: string;
}

