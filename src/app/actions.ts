'use server';

import { contactAIAssistantChat, type ContactAIAssistantChatInput } from "@/ai/flows/contact-ai-assistant-chat";

export async function askAI(input: ContactAIAssistantChatInput) {
  const result = await contactAIAssistantChat(input);
  return result.response;
}
