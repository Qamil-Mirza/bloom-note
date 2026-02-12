'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CardConfig, CardTheme, CardMessage } from '@/types/card';
import type { FlowerConfig } from '@/types/flower';
import { THEME_PRESETS } from '@/lib/utils/constants';

type WizardStep = 1 | 2 | 3;

interface WizardState {
  currentStep: WizardStep;
  flowers: FlowerConfig[];
  theme: CardTheme;
  message: CardMessage;
}

interface WizardActions {
  nextStep: () => void;
  prevStep: () => void;
  addFlower: (flower: FlowerConfig) => void;
  removeFlower: (index: number) => void;
  updateFlower: (index: number, updates: Partial<FlowerConfig>) => void;
  setFlowers: (flowers: FlowerConfig[]) => void;
  setTheme: (theme: CardTheme) => void;
  setMessage: (message: CardMessage) => void;
  reset: () => void;
}

type WizardContextType = WizardState & WizardActions;

const WizardContext = createContext<WizardContextType | null>(null);

const initialState: WizardState = {
  currentStep: 1,
  flowers: [],
  theme: THEME_PRESETS.romantic,
  message: {
    text: '',
    font: 'cursive',
    color: '#4b5563',
  },
};

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [flowers, setFlowers] = useState<FlowerConfig[]>([]);
  const [theme, setTheme] = useState<CardTheme>(THEME_PRESETS.romantic);
  const [message, setMessage] = useState<CardMessage>({
    text: '',
    font: 'cursive',
    color: '#4b5563',
  });

  const actions: WizardActions = {
    nextStep: () => setCurrentStep((s) => Math.min(s + 1, 3) as WizardStep),
    prevStep: () => setCurrentStep((s) => Math.max(s - 1, 1) as WizardStep),
    addFlower: (flower) => setFlowers((f) => [...f, flower]),
    removeFlower: (index) => setFlowers((f) => f.filter((_, i) => i !== index)),
    updateFlower: (index, updates) =>
      setFlowers((f) =>
        f.map((flower, i) => (i === index ? { ...flower, ...updates } : flower))
      ),
    setFlowers,
    setTheme,
    setMessage,
    reset: () => {
      setCurrentStep(1);
      setFlowers([]);
      setTheme(THEME_PRESETS.romantic);
      setMessage({ text: '', font: 'cursive', color: '#4b5563' });
    },
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        flowers,
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
