'use client'

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HelpAndSupportHomeSection() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        Need Help & Support?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-xl">
                        If you have any questions or need assistance, we’re here to help. Click below to visit our Help & Support page.
                    </p>
                </div>

                <Link
                    href="/help-an-support"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-base group"
                >
                    Go to Help & Support
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
