import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { JobList } from './components/JobList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <Categories />
        <JobList />
      </div>
    </QueryClientProvider>
  );
}

export default App;