export type Language = 'de' | 'en';

export interface Config {
  baseUrl: string;
  language: Language;
}

export const initConfig: Config = {
  baseUrl: '',
  language: 'de',
};
