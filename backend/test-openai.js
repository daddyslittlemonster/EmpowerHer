const OpenAI = require('openai');
require('dotenv').config();

async function testOpenAI() {
    try {
        console.log('API Key being used:', process.env.OPENAI_API_KEY);
        
        // Initialize OpenAI
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // Test prompt
        const prompt = "What are three basic tips for saving money?";
        
        console.log('Testing OpenAI API connection...');
        console.log('Sending prompt:', prompt);
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert financial advisor specializing in women's financial education. Provide clear, concise, and actionable advice."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const response = completion.choices[0].message.content;
        
        console.log('Success! OpenAI API Response:');
        console.log('----------------------------');
        console.log(response);
        console.log('----------------------------');
    } catch (error) {
        console.error('Error testing OpenAI API:', error.message);
        console.error('Full error:', error);
    }
}

testOpenAI(); 