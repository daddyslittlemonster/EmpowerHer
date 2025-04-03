const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
    try {
        console.log('API Key being used:', process.env.GEMINI_API_KEY);
        
        // Initialize the model
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
        });

        // Test prompt
        const prompt = "What are three basic tips for saving money?";
        
        console.log('Testing Gemini API connection...');
        console.log('Sending prompt:', prompt);
        
        // Generate content
        const result = await model.generateContent(prompt);
        
        // Wait for the response
        const response = await result.response;
        const text = response.text();
        
        console.log('Success! Gemini API Response:');
        console.log('----------------------------');
        console.log(text);
        console.log('----------------------------');
    } catch (error) {
        console.error('Error testing Gemini API:', error.message);
        console.error('Full error:', error);
    }
}

testGemini(); 