# EmpowerHer Backend

This is the backend service for the EmpowerHer financial education chatbot.

## Environment Variables

The following environment variables are required:

- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: The port to run the server on (default: 3001)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your environment variables:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

3. Start the server:
```bash
npm start
```

## API Endpoints

- `POST /api/chat`: Send a message to the chatbot
- `GET /api/health`: Health check endpoint 