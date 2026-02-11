import { cn } from '@/lib/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-romantic-500 focus:border-transparent',
        className
      )}
      {...props}
    />
  );
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-romantic-500 focus:border-transparent resize-none',
        className
      )}
      rows={rows}
      {...props}
    />
  );
}
