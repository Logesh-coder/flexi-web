export interface Application {
  id: number
  jobId: number
  jobTitle: string
  company: string
  appliedDate: string
  status: 'pending' | 'accepted' | 'rejected' | 'interviewing'
}