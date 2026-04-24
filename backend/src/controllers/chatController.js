import { GoogleGenAI } from '@google/genai';
import { CHAT_ASSISTANT_PROMPT } from '../utils/prompts.js';

let client;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }
  return client;
};

export const getChatResponse = async (req, res, next) => {
  try {
    const { message } = req.body;

    const response = await getClient().models.generateContent({
      model: 'gemini-2.0-flash',
      systemInstruction: CHAT_ASSISTANT_PROMPT,
      contents: [{ role: 'user', parts: [{ text: message }] }]
    });

    res.json({ reply: response.text });
  } catch (error) {
    next(error);
  }
};

// @desc    Stream AI chat response
// @route   POST /api/chat/stream
export const streamChat = async (req, res, next) => {
  try {
    const { messages } = req.body;

    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const chat = getClient().chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: CHAT_ASSISTANT_PROMPT
      },
      history
    });

    const stream = await chat.sendMessageStream({
      message: messages[messages.length - 1].content
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    next(error);
  }
};
