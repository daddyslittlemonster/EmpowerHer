const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for specific origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    // Add your frontend domain here, e.g.:
    // 'https://your-frontend-domain.com'
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

console.log('OpenAI API initialized');

// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Received message:', message);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert financial advisor specializing in women's financial education. Provide clear, concise, and actionable advice. Keep responses focused on practical steps and avoid complex financial jargon."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const response = completion.choices[0].message.content;
        console.log('OpenAI Response:', response);
        
        res.json({ response });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        if (error.code === 'insufficient_quota') {
            res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
        } else {
            res.status(500).json({ error: 'Failed to process request' });
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 