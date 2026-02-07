
import { ScriptOutput } from "../types";

interface PostResult {
  platform: string;
  status: 'scheduled' | 'error';
  scheduledTime: string;
  captionVariant: string;
}

const EMOJI_VARIANTS = ['💀', '🐺', '🌑', '🕯️', '🩸', '👁️', '📜'];

export const humanizePost = async (
  platform: string, 
  videoUrl: string, 
  script: ScriptOutput, 
  token: string
): Promise<PostResult> => {
  // 1. Variação de Caption (Adiciona emojis randômicos e varia hashtags)
  const randomEmoji = () => EMOJI_VARIANTS[Math.floor(Math.random() * EMOJI_VARIANTS.length)];
  const variantCaption = `${randomEmoji()} ${script.caption} ${randomEmoji()}\n\n${script.hashtags.join(' ')}`;

  // 2. Cálculo de Delay (1-10 minutos)
  const randomDelayMs = Math.floor(Math.random() * (600000 - 60000 + 1) + 60000);
  
  // 3. Verificação de Horário de Pico (18h-21h BRT)
  const now = new Date();
  const currentHour = now.getHours();
  let finalDelay = randomDelayMs;

  if (currentHour < 18) {
    // Se for antes das 18h, agenda para o início do pico hoje
    const peakStart = new Date();
    peakStart.setHours(18, Math.floor(Math.random() * 30), 0);
    finalDelay = peakStart.getTime() - now.getTime();
  } else if (currentHour > 21) {
    // Se já passou das 21h, agenda para o pico de amanhã
    const peakStartNextDay = new Date();
    peakStartNextDay.setDate(now.getDate() + 1);
    peakStartNextDay.setHours(18, Math.floor(Math.random() * 30), 0);
    finalDelay = peakStartNextDay.getTime() - now.getTime();
  }

  console.log(`[ViralWolf] Postagem humanizada para ${platform} agendada em ${Math.round(finalDelay / 60000)} minutos.`);

  // Simulação de execução assíncrona com callback de comentário automático
  setTimeout(() => {
    console.log(`[ViralWolf] Executando postagem oficial em ${platform}...`);
    console.log(`[Engagement Boost] Adicionando comentário automático: "Inacreditável isso! 😱"`);
  }, finalDelay);

  return {
    platform,
    status: 'scheduled',
    scheduledTime: new Date(now.getTime() + finalDelay).toLocaleTimeString(),
    captionVariant: variantCaption
  };
};
