'use client';

import { Clock, DollarSign, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const jobs = [
  {
    id: 1,
    title: 'Website Redesign Project',
    description:
      'Looking for an experienced web designer to redesign our company website...',
    budget: '$2,000 - $3,000',
    location: 'Remote',
    timePosted: '2 hours ago',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description:
      'Need a React Native developer for building a social media app...',
    budget: '$5,000 - $8,000',
    location: 'Remote',
    timePosted: '5 hours ago',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Content Writing for Blog',
    description:
      'Seeking a content writer to create engaging blog posts about technology...',
    budget: '$500 - $1,000',
    location: 'Remote',
    timePosted: '1 day ago',
    rating: 4.7,
  },
];

export function JobList() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Latest Projects
          </h2>
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
            View all
          </button>
        </div>
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {job.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.timePosted}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {job.rating}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  href={`/jobs/${job.id}`}
                  className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
