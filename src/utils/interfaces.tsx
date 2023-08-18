
interface LoggedUser {
  username: string
  token: string
}


interface Alert {
  type: 'success'|'error'|'warning'|'info'
  message: string
  id: string
}


interface AlertContextProps {
  alerts: Alert[]
  addAlert: (type: 'success'|'error'|'warning'|'info', message: string, timeout?: number) => void
  removeAlert: (id: string) => void
}


interface RaceInfoFetch{
  ability_bonus_options?: {
    choose: number,
    from:{option_set_type: 'options_array', options: {item: {index: string, name: string, url: string}}[]}
    type:string
  }
  ability_bonuses : any[]
  age: string
  alignment: string
  index: string
  language_desc: string
  languages:{index: string, name:string, url:string}[]
  language_options?: {
    choose: number,
    from:{option_set_type: 'options_array', options: {item: {index: string, name: string, url: string}}[]}
    type:string
  }
  name: string
  size: string
  size_description: string
  speed: number
  starting_proficiencies:{index: string, name: string, url: string}[]
  starting_proficiency_options?: {
    choose: number,
    from:{option_set_type: 'options_array', options: {item: {index: string, name: string, url: string}}[]}
    type:string
  }
  subraces: {index: string, name: string, url: string}[]
  traits: {index: string, name: string, url: string}[]
  url:string
}

interface TraitInfoFetch{
  index: string
  name: string
  url: string
  desc: string[]
  races: Object[]
  subraces: Object[]
  proficiencies: Object[]
  proficiency_choices: Object
  language_options: Object
  trait_specific: Object
}


interface CharacterInfo {
  name: string
  race: Race
  class: Class
  level: number
  alignment: Alignment
  background: Background
}


interface AbilityScores {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}


interface SavingThrowsMods {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}


interface Skills {
  [skillName: string]: {
    proficient: boolean
    expertise: boolean
  }
}


interface TraitsAndFeatures {
  racialTraits: TraitsOrFeature[]
  classFeatures: TraitsOrFeature[]
  feats: Feats[]
}


interface Equipment {
  equipArmor: string[]
  equipWeapons: string[]
  carriedItems: string[]
  inventory: string[]
}


interface Spell {
  name: string
  level: number
  school: string
  castingTime: string
  range: string
  components: string[]
  duration: string
  description: string
}


interface Spells {
  spellSlots: Record<string, number>
  knownSpells: Spell[]
  knownCantrips: Spell[]
}


interface Combat {
  currentHP: number
  MaxHP: number
  armorClass: number
  initiative: number
  speed: number
  attacks: string[]
  conditions: string[]
  resistances: string[]
}


interface BackgroundAndPersonality {
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
}


interface NotesAndDescription {
  notes: string
  description: string
}


interface Currency {
  gold: number
  silver: number
  copper: number
}


interface Feats {
  [featName: string]: string
}


interface TraitsOrFeature {
  [traitName: string]: string
}


interface Languages {
  knownLanguages: string[]
}


interface Proficiencies {
  weapons: string[]
  armor: string[]
  tools: string[]
  skills: string[]
}


interface Abilities {
  [abilityName: string]: string
}


interface Background {
  name: string
  features: string[]
}


interface Subclass {
  name: string
  abilityBonus: AbilityScores
  features: string[]
}


interface Alignment {
  name: string
  description: string
}


interface Class {
  name: string
  hitDie: string
  features: string[]
  subclass: Subclass
}


interface Race {
  name: string
  abilityBonus: AbilityScores
  traits: string[]
}


interface equipment {
  name: string
  abilityBonus: AbilityScores
  traits: string[]
}

