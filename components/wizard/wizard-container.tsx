'use client';

import { useWizard, WizardProvider } from '@/context/wizard-context';
import { Button } from '@/components/ui/button';
import { ProgressStepper } from '@/components/ui/progress-stepper';
import { StepPicker } from './step-picker';
import { StepArranger } from './step-arranger';
import { StepMessage } from './step-message';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MIN_FLOWERS } from '@/lib/utils/constants';

function WizardContent() {
  const {
    currentStep,
    nextStep,
    prevStep,
    flowers,
    theme,
    message,
  } = useWizard();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const canProceed = () => {
    if (currentStep === 1) return flowers.length >= MIN_FLOWERS;
    if (currentStep === 2) return true;
    if (currentStep === 3) return true;
    return false;
  };

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      const config = { flowers, theme, message };

      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });

      if (!response.ok) {
        throw new Error('Failed to create card');
      }

      const data = await response.json();
      router.push(`/c/${data.slug}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create card. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ProgressStepper
          currentStep={currentStep}
          steps={['Pick Flowers', 'Arrange', 'Message']}
        />

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {currentStep === 1 && <StepPicker />}
          {currentStep === 2 && <StepArranger />}
          {currentStep === 3 && <StepMessage />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handlePublish}
              disabled={!canProceed() || isPublishing}
            >
              {isPublishing ? 'Publishing...' : 'Publish Card'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function WizardContainer() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
