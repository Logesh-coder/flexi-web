'use client';

import { Clock, DollarSign, MapPin, Star, Briefcase, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // TODO: Fetch job details using the id
  const job = {
    title: 'Senior React Developer Needed',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    type: 'Full-time',
    budget: '$5,000 - $7,000',
    posted: '2 days ago',
    description: `We are looking for a senior React developer to join our team...  
  • 5+ years of experience with React
  • Strong TypeScript skills
  • Experience with Next.js
  • Knowledge of modern frontend practices`,
    requirements: [
      "Bachelor's degree in Computer Science or related field", // Escaped the single quote
      '5+ years of experience with React',
      'Strong understanding of TypeScript',
      'Experience with Next.js and other modern frameworks',
    ],
    client: {
      name: 'Sarah Johnson',
      title: 'Technical Director',
      rating: 4.9,
      reviews: 28,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {job.budget}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.posted}
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="whitespace-pre-line">{job.description}</p>

              <h2 className="text-xl font-semibold mt-6 mb-4">Requirements</h2>
              <ul className="list-disc pl-5">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              About the Client
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {job.client.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.client.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">
                    {job.client.rating}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({job.client.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
