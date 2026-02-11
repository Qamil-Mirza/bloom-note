import { Hero } from '@/components/landing/hero';
import { Demo } from '@/components/landing/demo';
import { Features } from '@/components/landing/features';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💐</span>
            <span className="text-xl font-bold text-gray-900">BloomNote</span>
          </div>
          <Link
            href="/create"
            className="text-romantic-600 hover:text-romantic-700 font-medium"
          >
            Create Card
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Demo Section */}
      <Demo />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <div className="bg-romantic-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Card?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start building a beautiful 3D Valentine card in seconds
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-romantic-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            Made with love for Valentine's Day 2026
          </p>
          <p className="text-sm text-gray-500 mt-2">
            BloomNote • No signup required • Always free
          </p>
        </div>
      </footer>
    </div>
  );
}
