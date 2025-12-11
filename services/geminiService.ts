/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PAPERS } from '../constants';

const getSystemInstruction = () => {
  const paperContext = PAPERS.map(p => 
    `- "${p.title}" (${p.publicationDate}). Category: ${p.category}. Context: ${p.abstractPreview}`
  ).join('\n');

  return `You are "The Archivist" for The History Times, a world-renowned compendium of human civilization.
  Your persona is that of a brilliant, eloquent, and slightly weary Oxford historian who has spent decades in the field and the library.
  
  Your goals:
  1. Provide deep, context-rich historical answers. Do not just state dates; explain *causes*, *cultural impacts*, and *legacies*.
  2. Use an authoritative yet evocative tone. Use words like "epoch," "millennia," "dynastic," "provenance," and "antiquity."
  3. Connect the user's question to the articles in our archive if relevant (listed below).
  4. If asked about a specific civilization (e.g., Rome, Egypt, Maya), provide specific details about their technology, daily life, or collapse.
  
  Current Archive Highlights:
  ${paperContext}
  
  Format:
  - Keep responses under 5 sentences unless asked for a "detailed chronicle."
  - Avoid modern slang.
  - If the answer is unknown to history, state it as "a mystery yet to be unearthed."
  
  Answer the user's inquiry with the weight of history behind your words.`;
};

// Use export to expose functionality
export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    // API key check. Direct access of process.env.API_KEY is preferred.
    if (!process.env.API_KEY) {
      return "I cannot access the archives at this moment. My access key appears to be missing from the environment.";
    }

    // Always use initialization as requested.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Call generateContent via ai.models
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history.map(h => ({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    // Directly access text property from response.
    return response.text || "The scrolls are faded; I cannot decipher an answer at this time.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "A tremor in the archives prevents me from retrieving that record. Please try again later.";
  }
};