'use client'

import JobPostForm from '@/components/jobs/JobPostForm'
import jobUpdateService from '@/services/edit-job'
import getSingleJobService from '@/services/get-single-job-service'
import { Job } from '@/types/jobs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditJobPage() {
    const router = useRouter();
    const [jobData, setJobData] = useState<Job | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const params = useParams();
    const slug = params?.slug;

    useEffect(() => {
        async function fetchJob() {
            try {
                const res = await getSingleJobService(slug);

                if (res.status == 200) {
                    setJobData(res.data?.data);
                }
            } catch (e) {
                setError('Failed to load job');
            }
        }

        if (slug) fetchJob();
    }, [slug]);

    const handleUpdateSubmit = async (data: Job) => {
        setLoading(true);
        try {
            const res = await jobUpdateService(slug, data);
            if (res.status === 200) {
                router.push('/account/jobs');
            }
        } catch (e) {
            setError('Failed to update job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Edit Job</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <JobPostForm
                onSubmit={handleUpdateSubmit}
                loading={loading}
                initialValues={jobData}
                isEdit={true} />
        </div>
    );
}
