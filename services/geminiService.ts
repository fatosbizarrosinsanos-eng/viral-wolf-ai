
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { ScriptOutput } from "../types";

// Helper para obter a key manual do localStorage com inicialização segura
const getApiKey = () => {
  const manualKey = localStorage.getItem('GEMINI_API_KEY') || '';
  return manualKey;
};

// Schema de validação Zod para garantir que a IA não quebre o contrato
const ScriptSchema = z.object({
  hook: z.string().min(1),
  facts: z.array(z.string()).min(1),
  cta: z.string().min(1),
  videoPrompt: z.string().min(1),
  caption: z.string().min(1),
  hashtags: z.array(z.string())
});

export const generateViralScript = async (topic: string): Promise<ScriptOutput> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Configure sua GEMINI_API_KEY nos Ajustes.");

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere um roteiro viral no estilo "Mestre de Fatos Estranhos" sobre: ${topic}.
    A persona é um narrador misterioso, tom dark, voz grave. 
    Estrutura: 1 Hook matador nos primeiros 5s, 3 a 5 fatos bizarros, 1 CTA forte.
    Inclua também um prompt detalhado para geração de vídeo no VEO (estilo life-laps, cinematográfico, partículas escuras, 9:16).
    Responda APENAS o JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING },
          facts: { type: Type.ARRAY, items: { type: Type.STRING } },
          cta: { type: Type.STRING },
          videoPrompt: { type: Type.STRING },
          caption: { type: Type.STRING },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["hook", "facts", "cta", "videoPrompt", "caption", "hashtags"]
      }
    }
  });

  const text = response.text || '';
  if (!text) throw new Error("A escuridão não respondeu. Tente novamente.");
  
  try {
    const rawJson = JSON.parse(text.trim());
    const validated = ScriptSchema.parse(rawJson);
    return validated;
  } catch (err: any) {
    throw new Error("A profecia da IA veio corrompida. Validação Zod falhou.");
  }
};

export const generateVeoVideo = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Configure sua GEMINI_API_KEY nos Ajustes.");

  // Usando Veo-3.1 para geração de alta qualidade
  const startOperation = async () => {
    const ai = new GoogleGenAI({ apiKey });
    return await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Estilo cinematográfico sombrio, 9:16, atmosfera de mistério, partículas em suspensão, zoom lento: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });
  };

  let operation;
  try {
    operation = await startOperation();
  } catch (err: any) {
    throw new Error(`O motor VEO falhou na ignição: ${err.message}`);
  }

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 8000));
    const statusAi = new GoogleGenAI({ apiKey });
    operation = await statusAi.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Vídeo VEO não materializado.");
  
  const finalResp = await fetch(`${downloadLink}&key=${apiKey}`);
  const blob = await finalResp.blob();
  return URL.createObjectURL(blob);
};
