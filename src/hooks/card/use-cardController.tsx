import React from 'react';

export interface CardContextType {
  currentStep: string;
  setCurrentStep: (nextStep: string) => void;
  currentTeam: 'home' | 'away';
  setCurrentTeam: React.Dispatch<React.SetStateAction<'home' | 'away'>>;
}


const initialContextState: CardContextType = {
  currentStep: 'analysisStart',
  setCurrentStep: () => [],
  currentTeam: 'home',
  setCurrentTeam: () => {},
};

export const CardContext =
React.createContext<CardContextType>(initialContextState);

export const useCard = () => React.useContext(CardContext);

export default function CardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = React.useState<string>('analysisStart');
  const [currentTeam, setCurrentTeam] = React.useState<'home'|'away'>('home');

  return (
    <CardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentTeam,
        setCurrentTeam,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
