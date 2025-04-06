require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3002;

// Log environment variables (without exposing sensitive data)
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);

// Initialize OpenAI
let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log('OpenAI client initialized successfully');
} catch (error) {
  console.error('Error initializing OpenAI client:', error.message);
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'healthy',
      environment: process.env.NODE_ENV,
      openaiInitialized: !!openai,
      apiKeyExists: !!process.env.OPENAI_API_KEY
    });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        console.log('Received chat request:', req.body);
        
        if (!openai) {
            console.error('OpenAI client not initialized');
            return res.status(500).json({ 
                error: 'OpenAI client not initialized',
                details: 'The OpenAI API key is missing or invalid'
            });
        }

        const { message } = req.body;
        
        if (!message) {
            console.error('No message provided in request');
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Sending request to OpenAI with message:', message);

        // Create a context-aware prompt for financial advice
        const prompt = `As a financial advisor specializing in women's financial education, please provide advice on: ${message}. 
        Focus on practical, actionable steps and consider common challenges women face in financial planning.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a financial advisor specializing in women's financial education and empowerment." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        console.log('Received response from OpenAI');

        res.json({ 
            response: completion.choices[0].message.content 
        });

    } catch (error) {
        console.error('Error in chat endpoint:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            response: error.response?.data
        });
        
        if (error.response?.status === 401) {
            return res.status(401).json({ error: 'Invalid API key' });
        }
        
        res.status(500).json({ 
            error: 'An error occurred while processing your request',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 