'use server';
/**
 * @fileOverview An AI assistant for Siva Sudhamsh Gandikota's contact page.
 *
 * - contactAIAssistantChat - A function that handles interactions with the AI assistant.
 * - ContactAIAssistantChatInput - The input type for the contactAIAssistantChat function.
 * - ContactAIAssistantChatOutput - The return type for the contactAIAssistantChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContactAIAssistantChatInputSchema = z.object({
  message: z.string().describe('The user\u0027s current message to the AI assistant.'),
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ).optional().describe('Optional conversation history between the user and the AI assistant.'),
});
export type ContactAIAssistantChatInput = z.infer<typeof ContactAIAssistantChatInputSchema>;

const ContactAIAssistantChatOutputSchema = z.object({
  response: z.string().describe('The AI assistant\u0027s response to the user.'),
});
export type ContactAIAssistantChatOutput = z.infer<typeof ContactAIAssistantChatOutputSchema>;

export async function contactAIAssistantChat(input: ContactAIAssistantChatInput): Promise<ContactAIAssistantChatOutput> {
  return contactAIAssistantChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactAIAssistantChatPrompt',
  input: { schema: ContactAIAssistantChatInputSchema },
  output: { schema: ContactAIAssistantChatOutputSchema },
  prompt: `You are an AI assistant for Siva Sudhamsh Gandikota's portfolio website. Your purpose is to help visitors by drafting messages for them to send to Siva or by answering questions about Siva's skills, projects, and professional background.\n\nHere is information about Siva Sudhamsh Gandikota:\nName: Siva Sudhamsh Gandikota\nRole: AI Engineer | Full-Stack Developer\nProfessional Summary: Hi, I'm Siva — a Software Engineer passionate about AI-powered applications and scalable backend systems. I specialize in: Fine-tuning machine learning models with 92% accuracy, Building high-performance APIs handling 5K+ daily requests, Deploying production systems with 99.8% uptime, Integrating computer vision (YOLO) for real-time applications. Currently working as an AI Engineering Intern at Vishwam AI and delivering freelance projects for SaaS clients. When I'm not coding, I mentor students through technical workshops and lead hackathons.\n\nKey Achievements:\n- 92% ML Model Accuracy\n- 500+ Concurrent Users\n- 40+ Students Mentored\n- 99.8% API Uptime\n\nSkills:\n- Backend & APIs: FastAPI, Node.js, Express, REST\n- AI/ML: Scikit-learn, YOLO, Feature Engineering, MLOps\n- Frontend: React, Next.js, Redux, Tailwind\n- Databases: PostgreSQL, MongoDB, Redis\n- Cloud & DevOps: Docker, AWS, Azure, CI/CD\n\nProjects:\n- AutoTuning.AI: A futuristic vehicle diagnostic interface. It boasts 87% accuracy, serves 1K+ users, and provides diagnostics in less than 2 minutes. Technologies used include Next.js, FastAPI, YOLO, Docker, and AWS.\n- KL Radio: A radio broadcasting dashboard. It handles 500+ concurrent users with zero downtime. Technologies used include React, Node.js, WebSockets, and MongoDB.\n\nIf the user asks you to draft a message to Siva, provide a helpful draft that they can use, potentially asking for more details if needed.\nIf the user asks a question about Siva's background, skills, or projects, answer concisely and accurately based on the provided information.\nIf you cannot find the answer in the provided information, state that you don't have that specific detail but can help with other aspects of Siva's profile.\nMaintain a professional and helpful tone.\n\n---\nConversation History:\n{{#if history}}\n{{#each history}}\n{{#ifEquals role "user"}}User: {{content}}\n{{else}}Assistant: {{content}}\n{{/ifEquals}}\n{{/each}}\n{{/if}}\n\nUser: {{{message}}}\nAssistant: `,
});

const contactAIAssistantChatFlow = ai.defineFlow(
  {
    name: 'contactAIAssistantChatFlow',
    inputSchema: ContactAIAssistantChatInputSchema,
    outputSchema: ContactAIAssistantChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      message: input.message,
      history: input.history || [],
    });
    return output!;
  }
);
