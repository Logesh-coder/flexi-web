'use client'

import JobPostForm from '@/components/jobs/JobPostForm'
import jobService from '@/services/job-service'
import { Job } from '@/types/jobs'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PostJobPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: Job) => {
    setError('');
    setLoading(true);
    try {
      const res = await jobService(data);
      if (res?.status === 201) {
        console.log('Job posted successfully:', res.data);
        router.push('/jobs')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      const errorMSG = axiosError.response?.data?.message || "Failed to post job. Please try again."
      setError(errorMSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Post a Job</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <JobPostForm
        onSubmit={handleFormSubmit}
        loading={loading}
      />
    </div>
  )
}