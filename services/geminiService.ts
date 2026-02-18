
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Perspective, Idea, UnblockMode, WebInsight, GamePrompt } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePerspectives = async (problem: string): Promise<Perspective[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this problem: "${problem}". Provide 3 distinct perspectives from different experts.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            advice: { type: Type.STRING },
            actionableStep: { type: Type.STRING },
          },
          required: ["name", "role", "advice", "actionableStep"],
        },
      },
    },
  });
  
  return JSON.parse(response.text || '[]');
};

export const generateIdeaBlitz = async (topic: string): Promise<Idea[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 10 rapid-fire ideas to solve/approach: "${topic}". Be creative, unconventional, and bold.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            feasibility: { type: Type.NUMBER },
          },
          required: ["title", "description", "feasibility"],
        },
      },
    },
  });
  
  return JSON.parse(response.text || '[]');
};

export const generateActionPlan = async (goal: string): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a concrete, step-by-step action plan to achieve: "${goal}". Break it down into exactly 7 sequential steps.`,
    config: {
      thinkingConfig: { thinkingBudget: 10000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
  });
  
  return JSON.parse(response.text || '[]');
};

export const generateWebInsights = async (query: string): Promise<WebInsight> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Research the following topic to find inspirations, existing solutions, or relevant data that can help someone "unblock" their progress: "${query}"`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    ?.map(chunk => ({
      title: chunk.web?.title || 'Untitled Source',
      uri: chunk.web?.uri || '#'
    })) || [];

  return {
    text: response.text || "No insights found.",
    sources: sources
  };
};

export const generateGamePrompt = async (gameType: string): Promise<GamePrompt> => {
  const promptMap: Record<string, string> = {
    'oblique': 'Generate a cryptic, lateral-thinking instruction (similar to Oblique Strategies) to help a stuck creative person find a new angle. Keep it short and evocative.',
    'catalyst': 'Generate a completely random, high-concept object or scenario and an instruction on how to apply its logic to a generic problem.',
    'reframe': 'Suggest a "crazy constraint" (e.g., "what if this had to be made entirely of water?") to force a re-evaluation of a project.'
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: promptMap[gameType] || 'Give a creative prompt for lateral thinking.',
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          content: { type: Type.STRING },
          instruction: { type: Type.STRING },
        },
        required: ["type", "content", "instruction"],
      },
    },
  });

  return JSON.parse(response.text || '{}');
};

export const startRubberDuckSession = (systemInstruction: string) => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction + " You are a supportive rubber duck. Listen to the user's technical or creative problem. Ask clarifying questions. Don't just give answers; help them find the answer themselves by being a sounding board.",
    },
  });
};
