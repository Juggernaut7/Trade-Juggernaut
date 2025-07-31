import axios from 'axios';

// Get the API token from environment variables
const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;

// Change the base URL to the Hugging Face Inference Router
const HF_ROUTER_BASE_URL = 'https://router.huggingface.co/v1';

// The specific model ID you want to use for the chat completions
const HF_CHAT_MODEL = 'zai-org/GLM-4.5:novita'; // As suggested by you

// Create an Axios instance for Hugging Face Inference Router API
const hfApi = axios.create({
  baseURL: HF_ROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${HF_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a prompt to the Hugging Face model via the Inference Router (OpenAI-compatible)
 * and gets a response.
 * @param {string} promptText - The user's input prompt.
 * @returns {Promise<string>} A promise that resolves to the AI's generated text.
 */
export const generateAiResponse = async (promptText) => {
  if (!HF_API_TOKEN) {
    console.error('Hugging Face API token is not set. Please add VITE_HF_API_TOKEN to your .env file.');
    throw new Error('Hugging Face API token missing.');
  }

  try {
    const response = await hfApi.post('/chat/completions', { // Target the chat completions endpoint
      model: HF_CHAT_MODEL,
      messages: [
        {
          role: "system", // Optional: Can set a system message for context/persona
          content: "You are a helpful AI assistant specialized in cryptocurrency market analysis and trading signals. Provide concise, data-driven insights."
        },
        {
          role: "user",
          content: promptText,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
      // stream: false, // If you wanted streaming responses, you'd set this to true and handle differently
    });

    // The response structure is now OpenAI-compatible
    if (response.data && response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message?.content) {
      return response.data.choices[0].message.content.trim();
    } else {
      console.error('Unexpected response structure from Hugging Face Inference Router:', response.data);
      throw new Error('AI did not return expected text.');
    }
  } catch (error) {
    console.error('Error generating AI response:', error.response ? error.response.data : error.message);
    let errorMessage = 'Failed to get AI response. Please check your prompt or try again later.';

    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = `Model '${HF_CHAT_MODEL}' not found or not available via this endpoint.`;
      } else if (error.response.status === 401) {
        errorMessage = 'Unauthorized: Invalid Hugging Face API token. Please check your VITE_HF_API_TOKEN.';
      } else if (error.response.status === 429) {
        errorMessage = 'Too many requests. You\'ve hit the rate limit. Please wait and try again.';
      } else if (error.response.status >= 500) {
        errorMessage = 'Hugging Face server error. Model might be loading or offline. Please try again.';
      } else if (error.response.data && error.response.data.error) {
        errorMessage = `AI Error: ${error.response.data.error}`;
      }
    }
    throw new Error(errorMessage);
  }
};