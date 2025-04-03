import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showAssessment, setShowAssessment] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
    }
  };

  const startAssessment = () => {
    setShowAssessment(true);
  };

  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">EmpowerHer</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#assessment">Assessment</a>
            <a href="#resources">Resources</a>
          </div>
          <div className="auth-buttons">
            <button className="login-btn">
              <i className="fas fa-user"></i>
              Log In
            </button>
            <button className="signup-btn">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <h1>Take Control of Your Financial Future</h1>
          <p>Empowering women with financial knowledge and confidence</p>
          <button className="cta-button" onClick={startAssessment}>Start Your Financial Journey</button>
        </section>

        <section id="assessment" className="assessment-section">
          <h2>Financial Assessment</h2>
          {!showAssessment ? (
            <div className="initial-assessment">
              <p>Answer a few questions to get personalized financial guidance</p>
              <button onClick={startAssessment}>Begin Assessment</button>
            </div>
          ) : (
            <div className="question-container">
              {/* Assessment questions will go here */}
            </div>
          )}
        </section>

        <section id="resources" className="resources-section">
          <h2>Financial Resources</h2>
          <div className="resource-cards">
            <div className="resource-card">
              <h3>Basic Financial Terms</h3>
              <p>Learn essential financial vocabulary and concepts</p>
            </div>
            <div className="resource-card">
              <h3>Budgeting Basics</h3>
              <p>Start managing your money effectively</p>
            </div>
            <div className="resource-card">
              <h3>Investment 101</h3>
              <p>Understand investment options and strategies</p>
            </div>
          </div>

          <div className="counselors-section">
            <h2>Our Professional Counselors</h2>
            <div className="counselor-cards">
              <div className="counselor-card">
                <div className="counselor-image">
                  <img src="https://via.placeholder.com/150" alt="Sarah Johnson" />
                </div>
                <div className="counselor-info">
                  <h3>Sarah Johnson</h3>
                  <p className="counselor-title">Financial Wellness Specialist</p>
                  <p className="counselor-bio">Specializing in post-divorce financial planning and debt management.</p>
                  <button className="counselor-btn">Schedule Consultation</button>
                </div>
              </div>
              {/* Add more counselor cards as needed */}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 EmpowerHer. All rights reserved.</p>
      </footer>

      {/* Chat Bot Widget */}
      <div className="chat-widget">
        <div className="chat-header">
          <h2>EmpowerHer Chat</h2>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me about financial advice..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App; 