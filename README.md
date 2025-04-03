# EmpowerHer - Financial Education Platform

EmpowerHer is a modern web application designed to provide financial education and guidance specifically tailored for women. The platform combines interactive assessments, educational resources, and an AI-powered chatbot to deliver personalized financial advice.

## Features

- Interactive financial assessment
- Educational resources and guides
- AI-powered chatbot for financial advice
- Responsive design for all devices
- Modern React frontend
- Node.js backend with OpenAI integration

## Project Structure

```
empowerher/
├── packages/
│   ├── frontend/          # React frontend application
│   │   ├── src/          # Source files
│   │   ├── public/       # Static files
│   │   └── package.json  # Frontend dependencies
│   │
│   └── backend/          # Node.js backend application
│       ├── src/          # Source files
│       └── package.json  # Backend dependencies
│
└── package.json          # Root package.json for workspace
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/empowerher.git
   cd empowerher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend package:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=3001
   ```

4. Start the development servers:
   ```bash
   npm start
   ```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:3001) servers.

## Development

- Frontend runs on port 3000
- Backend runs on port 3001
- The chatbot uses OpenAI's GPT-4 model for generating responses

## Scripts

- `npm start` - Start both frontend and backend
- `npm run start:frontend` - Start only the frontend
- `npm run start:backend` - Start only the backend
- `npm run build` - Build both frontend and backend
- `npm test` - Run tests
- `npm run lint` - Run linting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- React team for the amazing frontend framework
- Node.js community for the backend tools 