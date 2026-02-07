
/**
 * ESTRUTURA BACKEND (NODE.JS + EXPRESS + MONGODB)
 * 
 * Este código representa a lógica do servidor que você deve rodar no seu ambiente Node.
 * Pasta: /backend
 */

/* 
// Dependências Sugeridas:
// npm i express mongoose jsonwebtoken bcrypt cors dotenv zod

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const app = express();
app.use(express.json());
app.use(cors());

// --- MODELS ---
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKeys: {
    gemini: String,
    elevenLabs: String
  },
  socialTokens: {
    tiktok: String,
    instagram: String,
    youtube: String
  }
});

const HistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  topic: String,
  script: Object,
  videoUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const History = mongoose.model('History', HistorySchema);

// --- MIDDLEWARE ---
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Não autorizado');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'VIRAL_WOLF_SECRET');
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).send('Token inválido');
  }
};

// --- ROUTES ---

// Registro
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send('Lobo registrado com sucesso.');
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Credenciais inválidas.');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'VIRAL_WOLF_SECRET');
  res.json({ token, email: user.email });
});

// Histórico (Persistência)
app.get('/api/history', authMiddleware, async (req, res) => {
  const items = await History.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(items);
});

app.post('/api/history', authMiddleware, async (req, res) => {
  const history = new History({ ...req.body, userId: req.userId });
  await history.save();
  res.status(201).json(history);
});

// Configs
app.post('/api/configs', authMiddleware, async (req, res) => {
  await User.findByIdAndUpdate(req.userId, { 
    apiKeys: req.body.apiKeys, 
    socialTokens: req.body.socialTokens 
  });
  res.send('Ajustes salvos no banco.');
});

// Iniciar Servidor
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('🐺 Conectado ao MongoDB Atlas');
  app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
});
*/
