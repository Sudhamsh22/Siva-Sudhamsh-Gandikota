'use server';
/**
 * @fileOverview A Genkit flow for generating concise project insights from project details.
 *
 * - generateProjectInsights - A function that generates a concise project insight blurb.
 * - GenerateProjectInsightsInput - The input type for the generateProjectInsights function.
 * - GenerateProjectInsightsOutput - The return type for the generateProjectInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectInsightsInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  description: z.string().describe('A detailed description of the project.'),
  stats: z.array(z.string()).describe('Key statistics or achievements of the project.'),
  techStack: z.array(z.string()).describe('The technologies used in the project.'),
});
export type GenerateProjectInsightsInput = z.infer<typeof GenerateProjectInsightsInputSchema>;

const GenerateProjectInsightsOutputSchema = z.string().describe('A concise, memorable, and clear blurb highlighting key project achievements and technical details.');
export type GenerateProjectInsightsOutput = z.infer<typeof GenerateProjectInsightsOutputSchema>;

export async function generateProjectInsights(input: GenerateProjectInsightsInput): Promise<GenerateProjectInsightsOutput> {
  return generateProjectInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectInsightsPrompt',
  input: {schema: GenerateProjectInsightsInputSchema},
  output: {schema: GenerateProjectInsightsOutputSchema},
  prompt: `You are an expert content writer specializing in creating concise and impactful project descriptions for portfolios.

Your task is to generate a short, memorable, and clear blurb (2-3 sentences max) that highlights the key achievements and technical details of the project provided.
Focus on conveying the project's value and impact effectively.

Project Name: {{{projectName}}}
Description: {{{description}}}
Key Statistics/Achievements: {{#each stats}}- {{{this}}}{{/each}}
Technologies Used: {{#each techStack}}- {{{this}}}{{/each}}

Example Insight for AutoTuning.AI: 'Displays important insights such as a model reaching 87% accuracy after 10,000 loops, providing <2-minute diagnostics for over 1K users using Next.js and FastAPI.'

Generate the blurb based on the provided project information:
`,
});

const generateProjectInsightsFlow = ai.defineFlow(
  {
    name: 'generateProjectInsightsFlow',
    inputSchema: GenerateProjectInsightsInputSchema,
    outputSchema: GenerateProjectInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
