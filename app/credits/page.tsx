import Link from 'next/link';

const models = [
  {
    name: 'Earth',
    author: 'Poly by Google',
    license: 'CC-BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'Poly Pizza',
    sourceUrl: 'https://poly.pizza/m/94XG1XUy10q',
  },
  {
    name: 'Roses',
    author: 'Christopher F',
    license: 'CC-BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'Poly Pizza',
    sourceUrl: 'https://poly.pizza/m/1SUvEuQWCD2',
  },
  {
    name: 'Bear',
    author: 'jiang liu',
    license: 'CC-BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'Poly Pizza',
    sourceUrl: 'https://poly.pizza/m/3Eb9oLfZYIc',
  },
  {
    name: 'Tulips',
    author: 'Hugo Gibson',
    license: 'CC-BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'Poly Pizza',
    sourceUrl: 'https://poly.pizza/m/2zT-C10njmX',
  },
  {
    name: 'Dingus the cat',
    author: 'alwayshasbean',
    license: 'CC-BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'Poly Pizza',
    sourceUrl: 'https://poly.pizza/m/4dXgbKLHD9',
  },
  {
    name: 'Heart',
    author: 'Poly by Google',
    license: 'CC-BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    source: 'Poly Pizza',
    sourceUrl: 'https://poly.pizza/m/8RA5hHU5gHK',
  },
];

export default function CreditsPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-slate-950/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-2xl">🎁</span>
            <span className="text-xl font-bold text-white tracking-tight">
              BloomNote
            </span>
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Credits
        </h1>
        <p className="text-slate-400 mb-10">
          BloomNote uses 3D models generously shared by the following creators
          under the{' '}
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-romantic-400 hover:underline"
          >
            CC-BY 3.0
          </a>{' '}
          license.
        </p>

        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.name}
              className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-4"
            >
              <div>
                <a
                  href={model.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium hover:text-romantic-300 transition-colors"
                >
                  {model.name}
                </a>
                <p className="text-sm text-slate-500 mt-0.5">
                  by {model.author}
                </p>
              </div>
              <a
                href={model.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors shrink-0"
              >
                {model.source} &rarr;
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-white/10 rounded-xl p-6 sm:p-8 bg-white/[0.02]">
          <h2 className="text-lg font-semibold text-white mb-3">
            A note from the developer
          </h2>
          <p className="text-slate-400 leading-relaxed">
            This project would not have been possible without these creators. As someone
            with no prior experience building 3D renders, their openly shared work is
            what allowed BloomNote to exist at all. What you see on screen is a direct
            result of their generosity in sharing high-quality 3D models for others to
            build upon. Thank you.
          </p>
          <p className="text-slate-500 mt-4">
            — Qamil
          </p>
        </div>
      </main>
    </div>
  );
}
