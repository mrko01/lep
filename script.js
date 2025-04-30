
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Set up scroll animations with GSAP
    setupScrollAnimations();
    
    // Initialize the AI assistant
    initAIAssistant();
    
    // Set up navigation highlight
    setupNavHighlight();
    
    // Back to top button functionality
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Check screen size for responsive layout
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// Function to check screen size and adjust layout
function checkScreenSize() {
    const chatContainer = document.getElementById('ai-chat-container');
    
    if (window.innerWidth <= 1024) {
        // For smaller screens, make chat minimizable
        const closeButton = document.getElementById('close-ai');
        closeButton.innerHTML = '<i class="fas fa-minus"></i>';
        
        chatContainer.classList.add('minimized');
    } else {
        // For larger screens, keep chat always visible
        chatContainer.classList.remove('minimized');
    }
}

// Function to set up GSAP scroll animations
function setupScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate each pillar section
    document.querySelectorAll('.pillar').forEach((pillar) => {
        gsap.from(pillar.querySelector('.pillar-icon'), {
            scrollTrigger: {
                trigger: pillar,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        gsap.from(pillar.querySelector('h2'), {
            scrollTrigger: {
                trigger: pillar,
                start: "top 75%",
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        });
        
        gsap.from(pillar.querySelector('.pillar-subtitle'), {
            scrollTrigger: {
                trigger: pillar,
                start: "top 75%",
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power2.out"
        });
        
        gsap.from(pillar.querySelector('.pillar-info'), {
            scrollTrigger: {
                trigger: pillar,
                start: "top 70%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.7,
            ease: "power2.out"
        });
    });
}

// Function to highlight active navigation based on scroll position
function setupNavHighlight() {
    const sections = document.querySelectorAll('.pillar');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.getAttribute('href').substring(1) === current) {
                nav.classList.add('active');
            }
        });
    });
}

// AI Assistant functionality - improved and responsive
function initAIAssistant() {
    // Elements
    const chatContainer = document.getElementById('ai-chat-container');
    const chatHeader = document.querySelector('.chat-header');
    const closeButton = document.getElementById('close-ai');
    const sendMessageBtn = document.getElementById('send-message');
    const userMessageInput = document.getElementById('user-message');
    const chatMessages = document.getElementById('chat-messages');
    const topicButtons = document.querySelectorAll('.topic-btn');
    
    // API Key for Google Gemini
    const API_KEY = 'AIzaSyDG55m1mIek1S7HH3oJILfuWDNWT1DEx3U';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';
    
    // Track chat minimized state only for mobile
    let isChatMinimized = window.innerWidth <= 1024;
    
    // Handle chat header clicks for mobile
    if (window.innerWidth <= 1024) {
        // Toggle chat minimized state only on mobile
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent header click from triggering
            isChatMinimized = !isChatMinimized;
            chatContainer.classList.toggle('minimized', isChatMinimized);
            closeButton.innerHTML = isChatMinimized ? '<i class="fas fa-expand"></i>' : '<i class="fas fa-minus"></i>';
        });
        
        chatHeader.addEventListener('click', (e) => {
            // Only toggle if clicking on the header itself, not the close button
            if (e.target !== closeButton && !closeButton.contains(e.target)) {
                isChatMinimized = !isChatMinimized;
                chatContainer.classList.toggle('minimized', isChatMinimized);
                closeButton.innerHTML = isChatMinimized ? '<i class="fas fa-expand"></i>' : '<i class="fas fa-minus"></i>';
            }
        });
    }
    
    // Handle sending messages
    sendMessageBtn.addEventListener('click', sendMessage);
    userMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Topic button clicks - simplified with predefined questions
    const topicQuestions = {
        'think': "How can I improve my mental health?",
        'sleep': "What are the best tips for better sleep?",
        'move': "How much exercise do I need each day?",
        'eat': "What foods should I eat for more energy?",
        'addiction': "How can I reduce my screen time?"
    };
    
    topicButtons.forEach(button => {
        button.addEventListener('click', () => {
            const topic = button.getAttribute('data-topic');
            if (topicQuestions[topic]) {
                userMessageInput.value = topicQuestions[topic];
                sendMessage();
                
                // Ensure chat is expanded when a topic is selected on mobile
                if (window.innerWidth <= 1024 && isChatMinimized) {
                    isChatMinimized = false;
                    chatContainer.classList.remove('minimized');
                    closeButton.innerHTML = '<i class="fas fa-minus"></i>';
                }
            }
        });
    });
    
    // Function to send message to AI
    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (!userMessage) return;
        
        // Make sure chat is expanded on mobile
        if (window.innerWidth <= 1024 && isChatMinimized) {
            isChatMinimized = false;
            chatContainer.classList.remove('minimized');
            closeButton.innerHTML = '<i class="fas fa-minus"></i>';
        }
        
        // Display user message
        addMessageToChat(userMessage, 'user');
        userMessageInput.value = '';
        
        // Add typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Get AI response
        getAIResponse(userMessage)
            .then(response => {
                // Remove typing indicator
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                // Add AI response to chat
                if (response) {
                    addMessageToChat(response, 'assistant');
                } else {
                    addMessageToChat("I'm having trouble connecting right now. Please try again later.", 'assistant');
                }
            })
            .catch(error => {
                console.error("Error getting AI response:", error);
                // Remove typing indicator
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                addMessageToChat("I'm having trouble connecting right now. Please try again later.", 'assistant');
            });
    }
    
    // Function to add message to chat
    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        contentElement.textContent = message;
        
        messageElement.appendChild(contentElement);
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to get AI response - improved with better prompting
    async function getAIResponse(message) {
        try {
            // Context helps the AI give better responses related to health and wellness
            const healthContext = `You are Health Buddy, a friendly AI assistant focusing on the 5 pillars of wellbeing:
            1. Think Well (Mental Health)
            2. Sleep Well (Rest & Recovery)
            3. Move Well (Physical Activity)
            4. Eat Well (Nutrition)
            5. Manage Addiction (Controlling Harmful Habits)
            
            Keep your answers simple and friendly, aimed at high school students (grade 10). 
            Make your answers brief but helpful, about 2-3 sentences.
            If asked about something not related to health and wellbeing, politely redirect to health topics.`;
            
            const requestBody = {
                contents: [
                    {
                        parts: [
                            { text: healthContext },
                            { text: message }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 800,
                }
            };
            
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                return data.candidates[0].content.parts[0].text;
            } else {
                // Fallback responses if API fails
                const fallbackResponses = [
                    "For better wellbeing, try to balance all five pillars: think well, sleep well, move well, eat well, and manage addictions.",
                    "Getting 7-9 hours of sleep each night helps your brain and body recover. Try to go to bed and wake up at the same time every day.",
                    "Regular exercise boosts your mood and energy. Even a 30-minute walk daily makes a big difference!",
                    "Eating more fruits and vegetables gives your body the nutrients it needs to function well and fight off illness.",
                    "Mental health is just as important as physical health. Taking time to relax and manage stress helps your overall wellbeing."
                ];
                return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return null;
        }
    }
    
    // Welcome message
    setTimeout(() => {
        addMessageToChat("Hi! I'm your Health Buddy. Ask me anything about the 5 pillars of wellbeing, or click one of the topics below to get started!", 'assistant');
    }, 500);
}
