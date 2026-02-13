import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Send a 3D Valentine Gift
        <br />
        <span className="text-romantic-600">in Minutes</span>
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Pick a 3D gift, write your Valentine&apos;s message, and share with a link.
        No design skills required.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/create">
          <Button size="lg" className="text-lg px-8">
            Create Your Card 🎁
          </Button>
        </Link>
        <p className="text-sm text-gray-500">
          Free forever • No signup required
        </p>
      </div>
    </div>
  );
}
