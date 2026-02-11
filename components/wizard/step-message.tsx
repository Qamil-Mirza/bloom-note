'use client';

import { useWizard } from '@/hooks/use-wizard';
import { Textarea } from '@/components/ui/input';
import { MAX_MESSAGE_LENGTH, THEME_PRESETS } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/cn';
import type { CardTheme } from '@/types/card';

const themeOptions: { key: keyof typeof THEME_PRESETS; label: string }[] = [
  { key: 'romantic', label: 'Romantic' },
  { key: 'playful', label: 'Playful' },
  { key: 'elegant', label: 'Elegant' },
];

const fontOptions: Array<{ value: 'cursive' | 'serif' | 'sans'; label: string }> = [
  { value: 'cursive', label: 'Cursive' },
  { value: 'serif', label: 'Serif' },
  { value: 'sans', label: 'Sans' },
];

export function StepMessage() {
  const { message, theme, setMessage, setTheme } = useWizard();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Add Your Message</h2>
      <p className="text-gray-600 text-center mb-8">
        Personalize your card with a heartfelt message
      </p>

      <div className="space-y-6">
        {/* Message input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Message
          </label>
          <Textarea
            value={message.text}
            onChange={(e) =>
              setMessage({ ...message, text: e.target.value.slice(0, MAX_MESSAGE_LENGTH) })
            }
            placeholder="Write your Valentine's message here..."
            rows={6}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {message.text.length}/{MAX_MESSAGE_LENGTH}
          </div>
        </div>

        {/* Font picker */}
        <div>
          <label className="block text-sm font-medium mb-2">Font Style</label>
          <div className="grid grid-cols-3 gap-3">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                onClick={() => setMessage({ ...message, font: font.value })}
                className={cn(
                  'p-3 border-2 rounded-lg transition-all',
                  message.font === font.value
                    ? 'border-romantic-600 bg-romantic-50'
                    : 'border-gray-200 hover:border-romantic-300'
                )}
              >
                <span
                  className={cn(
                    'text-lg',
                    font.value === 'cursive' && 'font-cursive',
                    font.value === 'serif' && 'font-serif'
                  )}
                >
                  {font.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme presets */}
        <div>
          <label className="block text-sm font-medium mb-2">Card Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map(({ key, label }) => {
              const preset = THEME_PRESETS[key];
              return (
                <button
                  key={key}
                  onClick={() => setTheme(preset)}
                  className={cn(
                    'p-4 border-2 rounded-lg transition-all',
                    theme.preset === key
                      ? 'border-romantic-600 ring-2 ring-romantic-200'
                      : 'border-gray-200 hover:border-romantic-300'
                  )}
                >
                  <div
                    className="w-full h-12 rounded mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${preset.background} 0%, ${preset.accent} 100%)`,
                    }}
                  />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div
          className="p-6 rounded-lg"
          style={{ backgroundColor: theme.background }}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            style={{ borderColor: theme.accent, borderWidth: '2px' }}
          >
            <p
              className={cn(
                'text-center text-lg',
                message.font === 'cursive' && 'font-cursive',
                message.font === 'serif' && 'font-serif'
              )}
              style={{ color: message.color }}
            >
              {message.text || 'Your message will appear here...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
