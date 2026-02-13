'use client';

import { cn } from '@/lib/utils/cn';

interface ProgressStepperProps {
  currentStep: number;
  steps: string[];
}

export function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                  isActive && 'bg-romantic-600 text-white scale-110',
                  isCompleted && 'bg-romantic-200 text-romantic-700',
                  !isActive && !isCompleted && 'bg-gray-200 text-gray-500'
                )}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 font-medium',
                  isActive && 'text-romantic-600',
                  !isActive && 'text-gray-500'
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-16 h-0.5 mx-2 transition-all',
                  isCompleted ? 'bg-romantic-300' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
