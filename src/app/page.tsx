import HelpAndSupportHomeSection from '@/components/HelpAndSupportHomeSection'
import { Hero } from '@/components/Hero'
import { JobList } from '@/components/JobList'

export default function Home() {
  return (
    <main>
      <Hero />
      <HelpAndSupportHomeSection />
      <JobList />
    </main>
  )
}