export type FinishType = "white" | "dark" | "wood" | "concrete";
export type BedroomCount = 3 | 4 | 5;
export type TimeOfDay = "day" | "dusk" | "night";

export interface ConfigState {
  finish: FinishType;
  bedrooms: BedroomCount;
  timeOfDay: TimeOfDay;
  autoRotate: boolean;
}

export interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  aspectClass: string;
  colSpanClass: string;
  description: string;
  specs?: string[];
}

export interface FloorPlanLevel {
  id: string;
  name: string;
  tagline: string;
  area: string;
  rooms: string[];
  features: string[];
  description: string;
  elevation: string;
}

export interface SpecCategory {
  number: string;
  title: string;
  summary: string;
  items: {
    label: string;
    value: string;
    detail?: string;
  }[];
}

