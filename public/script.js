// Assessment questions
const questions = [
    {
        question: "What is your current financial situation?",
        options: [
            "Recently divorced and need financial guidance",
            "Struggling with debt management",
            "Want to start investing but don't know how",
            "Need help with basic budgeting"
        ]
    },
    {
        question: "What is your primary financial goal?",
        options: [
            "Building an emergency fund",
            "Getting out of debt",
            "Learning to invest",
            "Creating a budget"
        ]
    },
    {
        question: "How comfortable are you with financial terms and concepts?",
        options: [
            "Not comfortable at all",
            "Somewhat familiar",
            "Comfortable with basics",
            "Very comfortable"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

// Function to start the assessment
function startAssessment() {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// Function to begin the assessment questions
function beginAssessment() {
    document.getElementById('initial-assessment').classList.remove('visible');
    document.getElementById('initial-assessment').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    document.getElementById('question-container').classList.add('visible');
    showQuestion();
}

// Function to display current question
function showQuestion() {
    const questionData = questions[currentQuestion];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    
    questionElement.innerHTML = `<h3>${questionData.question}</h3>`;
    optionsElement.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.style.margin = '0.5rem';
        button.onclick = () => selectAnswer(index);
        optionsElement.appendChild(button);
    });
}

// Function to handle answer selection
function selectAnswer(answerIndex) {
    answers.push(answerIndex);
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Function to display results and recommendations
function showResults() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('assessment').classList.add('hidden');
    document.getElementById('recommendations-page').classList.remove('hidden');
    
    const recommendations = generateRecommendations();
    const recommendationsElement = document.getElementById('recommendations');
    recommendationsElement.innerHTML = recommendations;
    
    // Scroll to recommendations section
    document.getElementById('recommendations-page').scrollIntoView({ behavior: 'smooth' });
}

// Function to generate personalized recommendations
function generateRecommendations() {
    let html = '<div class="recommendations">';
    
    // Basic financial education recommendation
    if (answers[2] === 0 || answers[2] === 1) {
        html += `
            <div class="recommendation">
                <h4>Start with Financial Basics</h4>
                <p>We recommend beginning with our "Financial Terms 101" course to build a strong foundation.</p>
            </div>
        `;
    }

    // Debt management recommendation (moved to middle)
    if (answers[0] === 1) { // Debt management
        html += `
            <div class="recommendation">
                <h4>Debt Management Strategy</h4>
                <p>Start with our debt management workshop and connect with a debt counselor.</p>
                <button onclick="alert('This would connect to a debt counselor scheduling system')" class="debt-counselor-btn">Talk to a Debt Counselor</button>
            </div>
        `;
    }
    
    // Situation-specific recommendations
    switch(answers[0]) {
        case 0: // Recently divorced
            html += `
                <div class="recommendation">
                    <h4>Post-Divorce Financial Planning</h4>
                    <p>Connect with our financial advisors specializing in post-divorce financial planning.</p>
                    <button onclick="alert('This would connect to a financial advisor scheduling system')">Schedule Consultation</button>
                </div>
            `;
            break;
    }
    
    // Goal-based recommendations
    switch(answers[1]) {
        case 0: // Emergency fund
            html += `
                <div class="recommendation">
                    <h4>Emergency Fund Building</h4>
                    <p>Learn how to build and maintain an emergency fund with our step-by-step guide.</p>
                </div>
            `;
            break;
        case 2: // Investing
            html += `
                <div class="recommendation">
                    <h4>Investment Basics</h4>
                    <p>Start with our "Investment 101" course and connect with an investment advisor.</p>
                </div>
            `;
            break;
    }
    
    html += '</div>';
    return html;
}

// Function to restart the assessment
function restartAssessment() {
    currentQuestion = 0;
    answers = [];
    document.getElementById('recommendations-page').classList.add('hidden');
    document.getElementById('assessment').classList.remove('hidden');
    document.getElementById('initial-assessment').classList.remove('hidden');
    document.getElementById('initial-assessment').classList.add('visible');
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' });
}

// Add smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Chat Bot Functionality
function toggleChat() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Basic response logic
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I help you with your financial journey today?";
    }
    else if (lowerMessage.includes('budget')) {
        return "I can help you create a budget! Would you like to start with our basic budgeting guide?";
    }
    else if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
        return "Great question! We have several investment resources available. Would you like to learn about basic investment strategies?";
    }
    else if (lowerMessage.includes('debt')) {
        return "Managing debt is important. Would you like to speak with one of our debt management specialists?";
    }
    else if (lowerMessage.includes('divorce')) {
        return "I understand this is a sensitive topic. We have specialized financial advisors who can help with post-divorce financial planning.";
    }
    else {
        return "I'm here to help! You can ask me about budgeting, investing, debt management, or any other financial topics. What would you like to know more about?";
    }
}

// Add event listener for Enter key in chat input
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 