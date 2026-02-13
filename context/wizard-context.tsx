'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CardTheme, CardMessage } from '@/types/card';
import type { GiftPresetId } from '@/types/gift';
import { THEME_PRESETS } from '@/lib/utils/constants';

type WizardStep = 1 | 2;

interface WizardState {
  currentStep: WizardStep;
  giftPresetId: GiftPresetId | null;
  theme: CardTheme;
  message: CardMessage;
}

interface WizardActions {
  nextStep: () => void;
  prevStep: () => void;
  setGiftPresetId: (id: GiftPresetId) => void;
  setTheme: (theme: CardTheme) => void;
  setMessage: (message: CardMessage) => void;
  reset: () => void;
}

type WizardContextType = WizardState & WizardActions;

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [giftPresetId, setGiftPresetId] = useState<GiftPresetId | null>(null);
  const [theme, setTheme] = useState<CardTheme>(THEME_PRESETS.romantic);
  const [message, setMessage] = useState<CardMessage>({
    text: '',
    font: 'cursive',
    color: '#4b5563',
  });

  const actions: WizardActions = {
    nextStep: () => setCurrentStep((s) => Math.min(s + 1, 2) as WizardStep),
    prevStep: () => setCurrentStep((s) => Math.max(s - 1, 1) as WizardStep),
    setGiftPresetId,
    setTheme,
    setMessage,
    reset: () => {
      setCurrentStep(1);
      setGiftPresetId(null);
      setTheme(THEME_PRESETS.romantic);
      setMessage({ text: '', font: 'cursive', color: '#4b5563' });
    },
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        giftPresetId,
        theme,
        message,
        ...actions,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}
