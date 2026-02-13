const features = [
  {
    icon: '🎁',
    title: 'Easy to Create',
    description: 'Pick a Valentine gift, write your message, and share in under 2 minutes.',
  },
  {
    icon: '🔗',
    title: 'Share Instantly',
    description: 'Get a short link to share via SMS, email, or social media.',
  },
  {
    icon: '✨',
    title: 'Beautiful 3D',
    description: 'Stunning envelope-open animation that works on any device.',
  },
  {
    icon: '💝',
    title: 'Always Free',
    description: 'No signup, no ads, no hidden costs. Create unlimited cards.',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Optimized for phones, tablets, and desktops.',
  },
  {
    icon: '🎀',
    title: 'Personal Touch',
    description: 'Customize gifts, colors, themes, and messages.',
  },
];

export function Features() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why BloomNote?
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
