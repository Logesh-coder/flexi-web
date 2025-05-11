'use client'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { jobPostSchema } from '@/validators/auth.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Input from '../ui/Input'
import { JobPreview } from './JobPreview'

type JobPostFormProps = {
  onSubmit: (data: JobFormInput) => void
  onChangePreview?: (data: JobFormInput) => void
  loading: boolean
  initialValues?: any
  // initialValues?: Partial<JobFormInput>
  isEdit?: boolean
}

export type JobFormInput = {
  id?: string
  title: string
  description: string
  budget: string
  date: string
  area: string
  city: string
  landMark: string
  type: string
  timePosted: string
  skills: string[]
  experience: string
  durationStartTime: string
  durationEndTime: string
}

export default function JobPostForm({
  onSubmit,
  loading,
  onChangePreview,
  initialValues,
  isEdit = false,
}: JobPostFormProps) {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormInput>({
    resolver: yupResolver(jobPostSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const watchedData = watch()

  useEffect(() => {
    onChangePreview?.(watchedData)
  }, [watchedData, onChangePreview])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <div className="space-y-6">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label="Job Title"
                {...field}
                error={errors.title?.message}
                placeholder="Enter Title"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Job Description"
                {...field}
                placeholder="Describe the job requirements and responsibilities"
                rows={6}
                error={errors.description?.message}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <Input
                  label="Budget"
                  type="number"
                  placeholder="Daily Salary (min. 250)"
                  {...field}
                  error={errors.budget?.message}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Input
                  label="Working Date"
                  type="date"
                  {...field}
                  error={errors.date?.message}
                  placeholder="Select Date"
                  minDate={new Date()}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="durationStartTime"
              control={control}
              render={({ field }) => (
                <Input
                  label="Start Time"
                  type="time"
                  {...field}
                  error={errors.durationStartTime?.message}
                />
              )}
            />

            <Controller
              name="durationEndTime"
              control={control}
              render={({ field }) => (
                <Input
                  label="End Time"
                  type="time"
                  {...field}
                  error={errors.durationEndTime?.message}
                />
              )}
            />
          </div>

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                label="City"
                {...field}
                placeholder="Enter City"
                error={errors.city?.message}
              />
            )}
          />

          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <Input
                label="Area"
                {...field}
                placeholder="Enter Area"
                error={errors.area?.message}
              />
            )}
          />

          <Controller
            name="landMark"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Land Mark"
                {...field}
                placeholder="Nearby landmarks or specific location details"
                rows={3}
                error={errors.landMark?.message}
              />
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (isEdit ? 'Updating...' : 'Posting...') : isEdit ? 'Update Job' : 'Post Job'}
          </Button>
        </div>
      </form>

      <JobPreview jobData={watchedData} />
    </div>
  )
}
