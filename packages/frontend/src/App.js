import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [assessmentData, setAssessmentData] = useState({
    currentStep: 0,
    totalSteps: 5,
    answers: {},
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleAssessmentAnswer = (questionId, answer) => {
    setAssessmentData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      },
      currentStep: prev.currentStep + 1
    }));
  };

  const sendChatMessage = async (message) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3002'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot'
      };

      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <h1>EmpowerHer</h1>
        </div>
        <nav>
          <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
          <a href="#assessment" onClick={() => scrollToSection('assessment')}>Assessment</a>
          <a href="#resources" onClick={() => scrollToSection('resources')}>Resources</a>
          <a href="#about" onClick={() => scrollToSection('about')}>About</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <h1>Empower Your Financial Future</h1>
          <p>Take control of your finances with personalized guidance and resources designed for women.</p>
          <div className="hero-buttons">
            <a href="#assessment" className="primary-button" onClick={() => scrollToSection('assessment')}>
              Start Assessment
            </a>
            <a href="#resources" className="secondary-button" onClick={() => scrollToSection('resources')}>
              Explore Resources
            </a>
          </div>
        </section>

        <section id="assessment" className="assessment">
          <h2>Financial Assessment</h2>
          <div className="assessment-container">
            {assessmentData.currentStep < assessmentData.totalSteps ? (
              <div className="assessment-step">
                <div className="assessment-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(assessmentData.currentStep / assessmentData.totalSteps) * 100}%` }}
                    />
                  </div>
                  <div className="progress-steps">
                    {[...Array(assessmentData.totalSteps)].map((_, index) => (
                      <div 
                        key={index}
                        className={`progress-step ${index === assessmentData.currentStep ? 'active' : ''}`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Assessment questions will be rendered here */}
              </div>
            ) : (
              <div className="results-container">
                <h3>Your Financial Profile</h3>
                <p className="results-intro">
                  Based on your responses, here's your personalized financial guidance.
                </p>
                {/* Results will be rendered here */}
              </div>
            )}
          </div>
        </section>

        <section id="resources" className="resources">
          <h2>Financial Resources</h2>
          <div className="resource-grid">
            <div className="resource-card">
              <h3>Budgeting Basics</h3>
              <p>Learn the fundamentals of creating and maintaining a budget that works for you.</p>
              <a href="#" className="resource-button">Learn More</a>
            </div>
            <div className="resource-card">
              <h3>Investment Guide</h3>
              <p>Understand different investment options and how to build a diversified portfolio.</p>
              <a href="#" className="resource-button">Learn More</a>
            </div>
            <div className="resource-card">
              <h3>Retirement Planning</h3>
              <p>Plan for a secure retirement with our comprehensive guide to retirement savings.</p>
              <a href="#" className="resource-button">Learn More</a>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About EmpowerHer</h2>
          <div className="about-content">
            <p>
              EmpowerHer is dedicated to providing women with the knowledge and tools they need
              to achieve financial independence and security.
            </p>
            <div className="mission-statement">
              <h3>Our Mission</h3>
              <p>
                To empower women with financial education and resources, enabling them to make
                informed decisions and build a secure financial future.
              </p>
            </div>
            <div className="team-section">
              <h3>Our Team</h3>
              <div className="team-grid">
                <div className="team-member">
                  <div className="member-image" />
                  <h4>Sarah Johnson</h4>
                  <p>Financial Advisor</p>
                </div>
                <div className="team-member">
                  <div className="member-image" />
                  <h4>Maria Rodriguez</h4>
                  <p>Investment Specialist</p>
                </div>
                <div className="team-member">
                  <div className="member-image" />
                  <h4>Emily Chen</h4>
                  <p>Retirement Planning Expert</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className={`chat-widget ${!isChatOpen ? 'closed' : ''}`}>
        <div className="chat-header" onClick={() => setIsChatOpen(!isChatOpen)}>
          <h3>Financial Advisor Chat</h3>
          <button className="toggle-button">
            {isChatOpen ? 'Minimize' : 'Maximize'}
          </button>
        </div>
        {isChatOpen && (
          <>
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendChatMessage(chatInput);
                  }
                }}
                placeholder="Ask a financial question..."
              />
              <button onClick={() => sendChatMessage(chatInput)}>Send</button>
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <a href="mailto:info@empowerher.com">info@empowerher.com</a>
            <a href="tel:+1234567890">(123) 456-7890</a>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#assessment">Assessment</a>
            <a href="#resources">Resources</a>
            <a href="#about">About</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 EmpowerHer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 