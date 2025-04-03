require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3002;

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

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

        res.json({ 
            response: completion.choices[0].message.content 
        });

    } catch (error) {
        console.error('Error:', error);
        
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
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 