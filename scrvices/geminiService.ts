
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        report: {
            type: Type.STRING,
            description: "The fully-formatted Line report as a single string, strictly following the provided template."
        },
        analysis: {
            type: Type.ARRAY,
            description: "Analysis of AI-related topics from the user input against the NIA AI plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    item: { type: Type.STRING, description: "The specific AI-related item from the news/summary." },
                    planStatus: { type: Type.STRING, description: "e.g., '已規劃' (Planned), '可評估導入' (Feasible for evaluation), '無關' (Unrelated)." },
                    details: { type: Type.STRING, description: "A brief explanation or reference to the relevant project from the plan." }
                },
                required: ["item", "planStatus", "details"]
            }
        }
    },
    required: ["report", "analysis"]
};


export const generateReport = async (
  userInput: string, 
  reportTemplate: string,
  aiPlanText: string
): Promise<GeminiResponse> => {
  const prompt = `
You are "Line報告小幫手", a professional, precise, and formal AI assistant for the Taiwan National Immigration Agency (NIA). Your primary function is to transform user-provided news articles or event summaries into professionally formatted internal Line reports, ready to be pasted into a Line chat.

**Your Core Directives:**

1.  **Generate a Line Report:**
    *   Strictly adhere to the following template. Do not deviate from this structure. Fill in the placeholders \`{}\` with concise, relevant information derived from the user's input. The date should be today's date in YYYY.M.D format.
    *   Template:
        \`\`\`
        ${reportTemplate}
        \`\`\`

2.  **Fact-Check & Research:**
    *   Before finalizing the report, you MUST perform a web search to find relevant Taiwanese laws (e.g., 入出國及移民法, 國籍法) and verify facts from the user's input.
    *   Prioritize official government sources: Taiwan NIA, Ministry of the Interior (內政部), Executive Yuan (行政院).
    *   Incorporate findings into the report to ensure accuracy. Identify the news source, title, and URL from the user's text.

3.  **Analyze Against NIA AI Plan:**
    *   Compare any AI-related topics in the user's text against the provided "NIA AI Implementation Plan".
    *   Identify any AI-related tasks or systems mentioned.
    *   For each item, determine if it aligns with an existing project, is a new potential project, or is out of scope.
    *   Present this analysis in the 'analysis' part of the JSON output.

**Input Data:**

*   **User's Text:**
    \`\`\`
    ${userInput}
    \`\`\`
*   **NIA AI Implementation Plan (for comparison):**
    \`\`\`
    ${aiPlanText}
    \`\`\`

**Output Format:**

You MUST respond with a single, valid JSON object that strictly matches the defined response schema. Do not add any text, markdown, or commentary before or after the JSON.
`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedResponse: GeminiResponse = JSON.parse(jsonText);
    return parsedResponse;
  } catch (error) {
    console.error("Error generating report with Gemini:", error);
    throw new Error("無法生成報告，請檢查您的輸入或稍後再試。");
  }
};