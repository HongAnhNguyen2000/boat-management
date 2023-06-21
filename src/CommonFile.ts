export const PROPS_STRING = {
  type: String,
  default: '',
}

export const PROPS_BOOLEAN = {
  type: Boolean,
  default: false,
}

export const PROPS_NUMBER = {
  type: Number,
  default: 0,
}

export interface CustomerData {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  cardId: string;
  nation: string;
  place?: string;
  note: string;
}