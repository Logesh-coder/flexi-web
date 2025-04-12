import { Hero } from '@/components/Hero'
import { Categories } from '@/components/Categories'
import { JobList } from '@/components/JobList'

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <JobList />
    </main>
  )
}