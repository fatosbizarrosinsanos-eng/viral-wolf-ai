
export interface ScriptOutput {
  hook: string;
  facts: string[];
  cta: string;
  videoPrompt: string;
  caption: string;
  hashtags: string[];
}

export interface GenerationHistory {
  id: string;
  userId: string;
  title: string;
  script: ScriptOutput;
  videoUrl?: string;
  createdAt: string;
  status: 'draft' | 'generated' | 'posted';
}

export interface UserConfig {
  geminiKey: string;
  elevenLabsKey: string;
  tiktokToken: string;
  instagramToken: string;
  youtubeToken: string;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  CREATOR = 'creator',
  SETTINGS = 'settings',
  HISTORY = 'history',
  LOGIN = 'login',
  REGISTER = 'register'
}
