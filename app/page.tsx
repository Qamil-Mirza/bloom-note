import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💐</span>
          <span className="text-xl font-bold text-gray-900">BloomNote</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create a 3D Valentine Card
            <br />
            <span className="text-romantic-600">in Minutes</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Build a personalized 3D pop-up card with animated flower bouquets. Share with a link.
          </p>

          <Link href="/create">
            <Button size="lg" className="text-lg px-10 py-6 h-auto">
              Create Your Card 💐
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
