import { createContext, useContext } from 'react';

interface CharacterContextType {
  characterInfo?: CharacterInfo;
  abilityScores?: AbilityScores;
  savingThrows?: SavingThrowsMods;
  skills?: Skills;
  traitsAndFeatures?: TraitsAndFeatures;
  equipment?: Equipment;
  spells?: Spells;
  combat?: Combat;
  backgroundAndPersonality?: BackgroundAndPersonality;
  notesAndDescription?: NotesAndDescription;
  currency?: Currency;
  feats?: Feats;
  languages?: Languages;
  proficiencies?: Proficiencies;
  abilities?: Abilities;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};

interface CharacterProviderProps {
  children: React.ReactNode;
  initialCharacterData: CharacterContextType;
}

function CharacterProvider({ children, initialCharacterData }: CharacterProviderProps) {
  return (
    <CharacterContext.Provider value={initialCharacterData}>
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterProvider, useCharacterContext };
