
export enum UnblockMode {
  RUBBER_DUCK = 'RUBBER_DUCK',
  IDEA_BLITZ = 'IDEA_BLITZ',
  PERSPECTIVE_SHIFT = 'PERSPECTIVE_SHIFT',
  ACTION_PLAN = 'ACTION_PLAN',
  WEB_EXPLORER = 'WEB_EXPLORER',
  MIND_GAMES = 'MIND_GAMES'
}

export interface Perspective {
  name: string;
  role: string;
  advice: string;
  actionableStep: string;
}

export interface Idea {
  title: string;
  description: string;
  feasibility: number; // 1-10
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface WebInsight {
  text: string;
  sources: GroundingSource[];
}

export interface GamePrompt {
  type: string;
  content: string;
  instruction: string;
}
