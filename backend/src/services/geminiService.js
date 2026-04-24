import { GoogleGenAI } from '@google/genai';
let client;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }
  return client;
};



export const getStructuredAIResponse = async (prompt, systemInstruction, modelName = 'gemini-2.5-flash') => {
  try {
    const response = await getClient().models.generateContent({
      model: modelName,
      systemInstruction: systemInstruction,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new Error('AI analysis failed');
  }
};

export const analyzeImageWithGemini = async (prompt, imageBuffer, mimeType = 'image/jpeg', systemInstruction = "") => {
  try {
    const response = await getClient().models.generateContent({
      model: 'gemini-2.0-flash',
      systemInstruction: systemInstruction,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: imageBuffer.toString('base64')
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error('Gemini Vision Error:', error);
    throw new Error('Image analysis failed');
  }
};
