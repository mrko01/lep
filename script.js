
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize particles.js for background effect
    initParticles();
    
    // Set up scroll animations with GSAP
    setupScrollAnimations();
    
    // Initialize the AI assistant
    initAIAssistant();
    
    // Set up navigation highlight
    setupNavHighlight();
    
    // Initialize the dashboard charts
    initDashboardCharts();
    
    // Set up interactive elements
    setupInteractiveElements();
    
    // Setup presentation mode
    setupPresentationMode();
    
    // Theme toggling functionality
    document.getElementById('toggle-theme').addEventListener('click', toggleTheme);
    
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

// Initialize particles.js background
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#4A6FA5", "#166D39", "#7371FC", "#444E96", "#00A676"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#c8c8c8",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('#toggle-theme i');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

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
    
    // Animate header elements
    gsap.from('header h1', {
        scrollTrigger: {
            trigger: 'header',
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    gsap.from('header .tagline', {
        scrollTrigger: {
            trigger: 'header',
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
    });
    
    // Animate dashboard cards
    
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
        
        if (pillar.querySelector('.interactive-element')) {
            gsap.from(pillar.querySelector('.interactive-element'), {
                scrollTrigger: {
                    trigger: pillar.querySelector('.interactive-element'),
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.9,
                ease: "power2.out"
            });
        }
    });
    
    // Animate conclusion section
    gsap.from('#conclusion h2', {
        scrollTrigger: {
            trigger: '#conclusion',
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    gsap.from('.connection-diagram', {
        scrollTrigger: {
            trigger: '.connection-diagram',
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
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

// Initialize dashboard charts
function initDashboardCharts() {
    const chartColors = {
        think: '#7371FC',
        sleep: '#444E96',
        move: '#00A676',
        eat: '#FF8552',
        addiction: '#7D4E57'
    };
    
    const chartConfig = {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            cutout: '70%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    
    // Think Well Chart
    new Chart(document.getElementById('thinkChart'), {
        ...chartConfig,
        data: {
            datasets: [{
                data: [75, 25],
                backgroundColor: [
                    chartColors.think,
                    '#E9E9FF'
                ],
                borderWidth: 0
            }],
            labels: [
                'Mental Health',
                'Room for Improvement'
            ]
        }
    });
    
    // Sleep Well Chart
    new Chart(document.getElementById('sleepChart'), {
        ...chartConfig,
        data: {
            datasets: [{
                data: [65, 35],
                backgroundColor: [
                    chartColors.sleep,
                    '#D8DCF0'
                ],
                borderWidth: 0
            }],
            labels: [
                'Sleep Quality',
                'Room for Improvement'
            ]
        }
    });
    
    // Move Well Chart
    new Chart(document.getElementById('moveChart'), {
        ...chartConfig,
        data: {
            datasets: [{
                data: [60, 40],
                backgroundColor: [
                    chartColors.move,
                    '#C5F2E0'
                ],
                borderWidth: 0
            }],
            labels: [
                'Physical Activity',
                'Room for Improvement'
            ]
        }
    });
    
    // Eat Well Chart
    new Chart(document.getElementById('eatChart'), {
        ...chartConfig,
        data: {
            datasets: [{
                data: [70, 30],
                backgroundColor: [
                    chartColors.eat,
                    '#FFDCC9'
                ],
                borderWidth: 0
            }],
            labels: [
                'Nutrition',
                'Room for Improvement'
            ]
        }
    });
    
    // Habit Management Chart
    new Chart(document.getElementById('habitChart'), {
        ...chartConfig,
        data: {
            datasets: [{
                data: [55, 45],
                backgroundColor: [
                    chartColors.addiction,
                    '#E8D3D7'
                ],
                borderWidth: 0
            }],
            labels: [
                'Habit Management',
                'Room for Improvement'
            ]
        }
    });
    
    // Add click events to dashboard cards
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('click', function() {
            const pillarId = this.getAttribute('data-pillar');
            document.querySelector(`#${pillarId}-well`).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Set up interactive elements
function setupInteractiveElements() {
    // Breathing exercise
    const breathingBtn = document.querySelector('.start-breathing');
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingInstruction = document.querySelector('.breathing-instruction');
    let breathingInterval;
    let isBreathing = false;
    
    if (breathingBtn) {
        breathingBtn.addEventListener('click', function() {
            if (!isBreathing) {
                isBreathing = true;
                this.textContent = 'Stop';
                startBreathingExercise();
            } else {
                isBreathing = false;
                this.textContent = 'Start';
                clearInterval(breathingInterval);
                breathingInstruction.textContent = 'Breathe in...';
            }
        });
    }
    
    function startBreathingExercise() {
        let phase = 'inhale';
        breathingCircle.classList.add('inhale');
        breathingInstruction.textContent = 'Breathe in...';
        
        breathingInterval = setInterval(() => {
            if (phase === 'inhale') {
                phase = 'hold';
                breathingInstruction.textContent = 'Hold...';
                setTimeout(() => {
                    if (isBreathing) {
                        phase = 'exhale';
                        breathingCircle.classList.remove('inhale');
                        breathingCircle.classList.add('exhale');
                        breathingInstruction.textContent = 'Breathe out...';
                    }
                }, 2000);
            } else {
                phase = 'inhale';
                breathingCircle.classList.remove('exhale');
                breathingCircle.classList.add('inhale');
                breathingInstruction.textContent = 'Breathe in...';
            }
        }, 4000);
    }
    
    // Sleep cycle interaction
    const cycleStages = document.querySelectorAll('.cycle-stage');
    const cycleInfo = document.querySelector('.cycle-info p');
    
    if (cycleStages.length > 0 && cycleInfo) {
        const sleepInfo = {
            '1': 'Light Sleep: Your body starts to relax, but you can wake up easily. Your brain produces slow waves called theta waves.',
            '2': 'Deep Sleep: Your body repairs tissues, builds bone and muscle, and strengthens your immune system during this phase.',
            '3': 'REM Sleep: Your brain is active and dreaming occurs. This stage is important for memory and learning.'
        };
        
        cycleStages.forEach(stage => {
            stage.addEventListener('click', function() {
                const stageNum = this.getAttribute('data-stage');
                
                // Remove active class from all stages
                cycleStages.forEach(s => s.classList.remove('active'));
                
                // Add active class to current stage
                this.classList.add('active');
                
                // Update info text
                cycleInfo.textContent = sleepInfo[stageNum];
                
                // Animate the text change
                cycleInfo.style.opacity = '0';
                setTimeout(() => {
                    cycleInfo.style.opacity = '1';
                }, 200);
            });
        });
    }
    
    // Exercise demo interaction
    const exerciseBtns = document.querySelectorAll('.exercise-btn');
    const exerciseGif = document.querySelector('.exercise-gif');
    
    if (exerciseBtns.length > 0 && exerciseGif) {
        const exercises = {
            'stretch': 'https://cdn.dribbble.com/users/2593068/screenshots/7771215/media/67d1d801bf4dc7487b04d36b6ec78c1d.gif',
            'twist': 'https://cdn.dribbble.com/users/1902827/screenshots/6560535/dribbble_chair_twist.gif',
            'arms': 'https://cdn.dribbble.com/users/3097534/screenshots/11937583/media/5fce8d2a378bc4ad4dbc8ae4e003dfb7.gif'
        };
        
        exerciseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const exercise = this.getAttribute('data-exercise');
                
                // Remove active class from all buttons
                exerciseBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Update gif
                exerciseGif.style.opacity = '0';
                setTimeout(() => {
                    exerciseGif.src = exercises[exercise];
                    exerciseGif.style.opacity = '1';
                }, 300);
            });
        });
    }
    
    // Meal builder interaction
    const foodItems = document.querySelectorAll('.food-item');
    const plateSections = document.querySelectorAll('.plate-section');
    
    if (foodItems.length > 0 && plateSections.length > 0) {
        foodItems.forEach(item => {
            item.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const targetSection = document.querySelector(`.plate-section.${type}`);
                
                if (targetSection && targetSection.getAttribute('data-filled') === 'false') {
                    targetSection.setAttribute('data-filled', 'true');
                    targetSection.textContent = this.textContent;
                    
                    // Add animation
                    this.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
        
        plateSections.forEach(section => {
            section.addEventListener('click', function() {
                if (this.getAttribute('data-filled') === 'true') {
                    const type = this.classList[1]; // class name (veggies, protein, carbs)
                    this.setAttribute('data-filled', 'false');
                    
                    // Reset text
                    if (type === 'veggies') this.textContent = 'Vegetables (50%)';
                    if (type === 'protein') this.textContent = 'Protein (25%)';
                    if (type === 'carbs') this.textContent = 'Whole Grains (25%)';
                }
            });
        });
    }
    
    // Screen time challenge
    const startChallengeBtn = document.querySelector('.challenge-btn.start');
    const resetChallengeBtn = document.querySelector('.challenge-btn.reset');
    const timerCount = document.querySelector('.timer-count');
    let challengeInterval;
    let challengeSeconds = 1200; // 20 minutes
    
    if (startChallengeBtn && resetChallengeBtn && timerCount) {
        startChallengeBtn.addEventListener('click', function() {
            if (this.textContent === 'Start Challenge') {
                this.textContent = 'Pause';
                startScreenChallenge();
            } else {
                this.textContent = 'Start Challenge';
                clearInterval(challengeInterval);
            }
        });
        
        resetChallengeBtn.addEventListener('click', function() {
            clearInterval(challengeInterval);
            challengeSeconds = 1200;
            updateTimerDisplay();
            startChallengeBtn.textContent = 'Start Challenge';
        });
    }
    
    function startScreenChallenge() {
        updateTimerDisplay();
        
        challengeInterval = setInterval(() => {
            challengeSeconds--;
            
            if (challengeSeconds <= 0) {
                clearInterval(challengeInterval);
                timerCount.innerHTML = 'Done! 🎉';
                startChallengeBtn.textContent = 'Start Challenge';
            } else {
                updateTimerDisplay();
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(challengeSeconds / 60);
        const seconds = challengeSeconds % 60;
        timerCount.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Interactive tips
    const interactiveTips = document.querySelectorAll('.interactive-tip');
    
    interactiveTips.forEach(tip => {
        tip.addEventListener('click', function() {
            // Get tip content
            const tipContent = this.textContent;
            
            // Send to AI as a query
            if (document.getElementById('user-message')) {
                document.getElementById('user-message').value = `Tell me more about: ${tipContent}`;
                document.getElementById('send-message').click();
                
                // Ensure chat is visible on mobile
                if (window.innerWidth <= 1024) {
                    const chatContainer = document.getElementById('ai-chat-container');
                    chatContainer.classList.remove('minimized');
                }
            }
        });
    });
    
    // Show connections button
    const showConnectionsBtn = document.getElementById('show-connections');
    const connectionDiagram = document.getElementById('connection-diagram');
    
    if (showConnectionsBtn && connectionDiagram) {
        showConnectionsBtn.addEventListener('click', function() {
            // Create diagram dynamically
            connectionDiagram.innerHTML = '';
            
            // Create center node
            const centerNode = document.createElement('div');
            centerNode.className = 'center-node';
            centerNode.innerHTML = 'Complete<br>Wellbeing';
            centerNode.style.position = 'absolute';
            centerNode.style.top = '50%';
            centerNode.style.left = '50%';
            centerNode.style.transform = 'translate(-50%, -50%)';
            centerNode.style.width = '100px';
            centerNode.style.height = '100px';
            centerNode.style.borderRadius = '50%';
            centerNode.style.backgroundColor = '#4A6FA5';
            centerNode.style.color = 'white';
            centerNode.style.display = 'flex';
            centerNode.style.alignItems = 'center';
            centerNode.style.justifyContent = 'center';
            centerNode.style.textAlign = 'center';
            centerNode.style.fontWeight = 'bold';
            centerNode.style.boxShadow = '0 0 15px rgba(0,0,0,0.1)';
            centerNode.style.zIndex = '2';
            centerNode.style.textShadow = '1px 1px 2px rgba(0,0,0,0.2)';
            
            connectionDiagram.appendChild(centerNode);
            
            // Pillar nodes
            const pillars = [
                { name: 'Think Well', color: '#7371FC', icon: 'brain' },
                { name: 'Sleep Well', color: '#444E96', icon: 'moon' },
                { name: 'Move Well', color: '#00A676', icon: 'running' },
                { name: 'Eat Well', color: '#FF8552', icon: 'apple-alt' },
                { name: 'Manage Habits', color: '#7D4E57', icon: 'balance-scale' }
            ];
            
            // Position nodes in a circle
            const radius = 120;
            const angleStep = (2 * Math.PI) / pillars.length;
            
            pillars.forEach((pillar, index) => {
                const angle = angleStep * index - Math.PI/2; // Start from top
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                
                // Create node
                const node = document.createElement('div');
                node.className = 'pillar-node';
                node.innerHTML = `<i class="fas fa-${pillar.icon}"></i><span>${pillar.name}</span>`;
                node.style.position = 'absolute';
                node.style.top = `calc(50% + ${y}px)`;
                node.style.left = `calc(50% + ${x}px)`;
                node.style.transform = 'translate(-50%, -50%)';
                node.style.width = '80px';
                node.style.height = '80px';
                node.style.borderRadius = '50%';
                node.style.backgroundColor = pillar.color;
                node.style.color = 'white';
                node.style.display = 'flex';
                node.style.flexDirection = 'column';
                node.style.alignItems = 'center';
                node.style.justifyContent = 'center';
                node.style.textAlign = 'center';
                node.style.fontWeight = 'bold';
                node.style.fontSize = '0.8rem';
                node.style.boxShadow = '0 0 15px rgba(0,0,0,0.1)';
                node.style.zIndex = '2';
                
                // Add icon
                node.querySelector('i').style.fontSize = '1.5rem';
                node.querySelector('i').style.marginBottom = '5px';
                
                connectionDiagram.appendChild(node);
                
                // Draw connection line
                const line = document.createElement('div');
                line.className = 'connection-line';
                line.style.position = 'absolute';
                line.style.top = '50%';
                line.style.left = '50%';
                line.style.width = `${radius}px`;
                line.style.height = '2px';
                line.style.backgroundColor = pillar.color;
                line.style.transform = `rotate(${angle * 180/Math.PI}deg)`;
                line.style.transformOrigin = '0 0';
                line.style.zIndex = '1';
                
                connectionDiagram.appendChild(line);
            });
            
            // Animate connections
            gsap.from('.pillar-node', {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.5)"
            });
            
            gsap.from('.connection-line', {
                scaleX: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            });
            
            // Change button text
            this.textContent = 'Reset Diagram';
            this.addEventListener('click', function() {
                location.reload();
            }, { once: true });
        });
    }
}

// Setup presentation mode
function setupPresentationMode() {
    const presentationBtn = document.getElementById('presentation-mode');
    const presentationOverlay = document.getElementById('presentation-overlay');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const exitPresentationBtn = document.getElementById('exit-presentation');
    const slideIndicator = document.getElementById('slide-indicator');
    
    // Define slides as section IDs
    const slides = [
        'dashboard',
        'think-well',
        'sleep-well',
        'move-well',
        'eat-well',
        'manage-addiction'
    ];
    let currentSlideIndex = 0;
    
    if (presentationBtn && presentationOverlay) {
        presentationBtn.addEventListener('click', function() {
            presentationOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            showSlide(0);
        });
        
        exitPresentationBtn.addEventListener('click', function() {
            presentationOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        });
        
        prevSlideBtn.addEventListener('click', function() {
            if (currentSlideIndex > 0) {
                showSlide(currentSlideIndex - 1);
            }
        });
        
        nextSlideBtn.addEventListener('click', function() {
            if (currentSlideIndex < slides.length - 1) {
                showSlide(currentSlideIndex + 1);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (presentationOverlay.classList.contains('hidden')) return;
            
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlideBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevSlideBtn.click();
            } else if (e.key === 'Escape') {
                exitPresentationBtn.click();
            }
        });
    }
    
    function showSlide(index) {
        currentSlideIndex = index;
        
        // Update slide indicator
        slideIndicator.textContent = `Slide ${index + 1}/${slides.length}`;
        
        // Scroll to the section
        document.getElementById(slides[index]).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Update buttons state
        prevSlideBtn.disabled = index === 0;
        nextSlideBtn.disabled = index === slides.length - 1;
        
        // Visual feedback for disabled buttons
        prevSlideBtn.style.opacity = index === 0 ? '0.5' : '1';
        nextSlideBtn.style.opacity = index === slides.length - 1 ? '0.5' : '1';
    }
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
                
                // Add visual feedback
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                }, 500);
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
        
        // Display user message with animation
        addMessageToChat(userMessage, 'user');
        userMessageInput.value = '';
        
        // Add typing indicator with animation
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
                
                // Add AI response to chat with animation
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
    
    // Function to add message to chat with animation
    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        contentElement.textContent = message;
        
        messageElement.appendChild(contentElement);
        chatMessages.appendChild(messageElement);
        
        // Animate message appearance
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);
        
        // Scroll to bottom of chat with smooth animation
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
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
            5. Manage Habits (Controlling Harmful Behaviors)
            
            Keep your answers simple and friendly, aimed at high school students (grade 10). 
            Make your answers brief but helpful, about 2-3 sentences.
            If asked about something not related to health and wellbeing, politely redirect to health topics.
            
            Current conversation context: This is part of an interactive class presentation about the 5 pillars of wellbeing.`;
            
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
                    "For better wellbeing, try to balance all five pillars: think well, sleep well, move well, eat well, and manage habits.",
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
    
    // Welcome message with delay for better UX
    setTimeout(() => {
        addMessageToChat("Hi! I'm your Health Buddy for this presentation. Ask me anything about the 5 pillars of wellbeing, or click one of the topics below to get started!", 'assistant');
    }, 800);
}

