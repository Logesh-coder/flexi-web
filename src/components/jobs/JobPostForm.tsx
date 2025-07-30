'use client'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { getLocationService } from '@/services/get-location'
import { jobPostSchema } from '@/validators/auth.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
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
  contact: string
  city: string
  landMark: string
  type: string
  timePosted: string
  skills: string[]
  experience: string
  durationStartTime: string
  durationEndTime: string
}

type Area = {
  id: string;
  name: string;
};

type LocationType = {
  cityId: string;
  cityName: string;
  areas: Area[];
};


export default function JobPostForm({
  onSubmit,
  loading,
  onChangePreview,
  initialValues,
  isEdit = false,
}: JobPostFormProps) {
  const [location, setLocation] = useState<LocationType[]>([]);

  const {
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<JobFormInput>({
    resolver: yupResolver(jobPostSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    // defaultValues: initialValues,
  })

  console.log('initialValues', initialValues)

  useEffect(() => {
    if (!initialValues) return;

    const parsedDate = new Date(initialValues.date);
    const isValidDate = !isNaN(parsedDate.getTime());

    const formattedDate = isValidDate
      ? parsedDate.toISOString().split('T')[0]
      : '';

    reset({
      ...initialValues,
      date: formattedDate,
    });
  }, [initialValues?.date]);


  // useEffect(() => {
  //   if (initialValues) {
  //     reset(initialValues)
  //   }
  // }, [initialValues, reset])

  const watchedData = watch()
  // const  clg = watchedData && watchedData()

  useEffect(() => {
    onChangePreview?.(watchedData)
  }, [watchedData, onChangePreview]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const limit = parseInt(process.env.NEXT_PUBLIC_PAGELIMIT || "10", 10);

        const response = await getLocationService();

        // console.log('response', response?.data?.data)

        setLocation(response?.data?.data);

      } catch (err: any) {
        // setError(err.message || 'Failed to fetch jobs')
        console.log('err', err)
      }
    }

    fetchJobs()
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
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
                label="Job Description (option)"
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
              <div className="relative">
                <label className="block text-sm font-medium mb-1">City</label>
                <select
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    setValue("area", "")
                  }}
                  className="w-full appearance-none border rounded-lg px-3 py-[10px] pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select a city</option>
                  {location.map((loc: any) => (
                    <option key={loc.cityId} value={loc.cityName}>
                      {loc.cityName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-[70%] -translate-y-1/2 w-6 h-6 text-gray-600 pointer-events-none" />
                {errors.city?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="area"
            control={control}
            render={({ field }) => {
              const selectedCity = watch("city")
              const selectedLocation = location.find((loc: any) => loc.cityName === selectedCity)

              return (
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Area</label>
                  <select
                    {...field}
                    value={field.value || ""}
                    disabled={!selectedLocation}
                    className="w-full appearance-none border rounded-lg px-3 py-[10px] pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select an area</option>
                    {selectedLocation?.areas.map((area) => (
                      <option key={area.id} value={area.name} className="capitalize">
                        {area.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-[70%] -translate-y-1/2 w-6 h-6 text-gray-600 pointer-events-none" />
                  {errors.area?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
                  )}
                </div>
              )
            }}
          />

          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <Input
                label="Contact us (optional)"
                type="number"
                placeholder="Contact us"
                {...field}
                error={errors.contact?.message}
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

          {loading ? (
            <Button
              type="button"
              disabled
              className="w-full cursor-not-allowed opacity-60"
            >
              {isEdit ? 'Updating...' : 'Posting...'}
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              {isEdit ? 'Update Job' : 'Post Job'}
            </Button>
          )}

        </div>
      </form>

      <JobPreview jobData={watchedData} />
    </div>
  )
}
