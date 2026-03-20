import type { ChatCompletionTool } from "openai/resources/chat/completions";

// OpenAI expects `tools` to be an array of `ChatCompletionTool`.
export const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "getWeather",
      description: "Get current weather for a city",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "CityName",
          },
        },
        required: ["city"],
      },
    },
  },
];
