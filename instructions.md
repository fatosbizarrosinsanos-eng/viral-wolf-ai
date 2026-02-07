
# 🐺 ViralWolf AI - Guia de Implementação Total

Siga este guia para erguer seu império de canais dark.

## 1. Requisitos Prévios
- Node.js v18+ instalado.
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free Tier).
- Google Cloud Project com as APIs Gemini e Veo habilitadas.
- ElevenLabs API Key para narração (opcional).

## 2. Configuração Local (Monorepo)
1. Crie uma pasta `viralwolf`.
2. Dentro dela, crie `/frontend` (Vite + React) e `/backend` (Express).
3. **Frontend:**
   - Instale: `npm i lucide-react zustand @google/genai framer-motion`.
   - Copie os arquivos gerados neste app para a pasta `src/`.
4. **Backend:**
   - Instale: `npm i express mongoose jsonwebtoken bcrypt cors dotenv zod`.
   - Crie um arquivo `.env` com `MONGO_URI`, `JWT_SECRET`, e `PORT=3001`.

## 3. Configuração de APIs Sociais (OAuth)
Para que o botão de "Postar" funcione em ambiente de produção:
- **TikTok:** Crie um app no [TikTok for Developers](https://developers.tiktok.com/).
- **Instagram:** Use o [Meta for Developers](https://developers.facebook.com/) e a Instagram Graph API.
- **YouTube:** Crie credenciais no [Google Cloud Console](https://console.cloud.google.com/) para YouTube Data API v3.

## 4. Deploy Vercel
1. Conecte seu repositório à Vercel.
2. Configure o frontend para o diretório `/frontend`.
3. Configure o backend como "Serverless Functions" ou hospede em um serviço como Render/Railway.
4. Adicione as variáveis de ambiente no dashboard da Vercel.

## 5. Teste de Operação
1. **Registro:** Crie sua conta.
2. **Ajustes:** Insira sua `GEMINI_API_KEY`. Clique em "Salvar e Testar".
3. **Criação:**
   - Digite um tema (ex: "A maldição da múmia de gelo").
   - O Mestre gerará um roteiro JSON agressivo.
   - Clique em "Gerar Vídeo VEO" (pode levar 1-3 minutos).
   - Visualize o resultado em 9:16 cinematográfico.
4. **Postagem:** Clique no ícone da rede social. O sistema simulará o delay humanizado antes de confirmar.

---
*Lembre-se: O sucesso é uma escolha agressiva. Use o ViralWolf para dominar os algoritmos.*
