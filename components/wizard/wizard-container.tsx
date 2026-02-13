'use client';

import { useWizard, WizardProvider } from '@/context/wizard-context';
import { Button } from '@/components/ui/button';
import { ProgressStepper } from '@/components/ui/progress-stepper';
import { StepGiftPicker } from './step-gift-picker';
import { StepMessage } from './step-message';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function WizardContent() {
  const {
    currentStep,
    nextStep,
    prevStep,
    giftPresetId,
    theme,
    message,
  } = useWizard();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const canProceed = () => {
    if (currentStep === 1) return giftPresetId !== null;
    if (currentStep === 2) return true;
    return false;
  };

  const handlePublish = async () => {
    if (!giftPresetId) return;
    setIsPublishing(true);

    try {
      const config = { version: 2 as const, giftPresetId, theme, message };

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
          steps={['Choose Gift', 'Message']}
        />

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {currentStep === 1 && <StepGiftPicker />}
          {currentStep === 2 && <StepMessage />}
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

          {currentStep < 2 ? (
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
