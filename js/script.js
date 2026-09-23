/**
 * Ali Mohamed Portfolio - Main Script
 */

/* ==========================================================================
   Configuration Object
   ========================================================================== */
const portfolioConfig = {
    linkedin: "#", // TODO: Add Ali's LinkedIn profile URL
    github: "#",   // TODO: Add Ali's GitHub profile URL
    whatsapp: "#", // TODO: Add Ali's WhatsApp URL (e.g., https://wa.me/...)
    email: "mailto:ali.mohamed.abdelhamid.443@gmail.com"
};

/* ==========================================================================
   DOM Elements
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
const interactiveBg = document.getElementById('interactive-bg');

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to dark if no saved preference
    if (savedTheme) {
        rootElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        rootElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
        localStorage.setItem('theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

/* ==========================================================================
   Custom Cursor (Desktop Only)
   ========================================================================== */
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isTouchDevice && !prefersReducedMotion && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add a slight delay to the outline for smooth effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 50);
    });
    
    // Add hover effect for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .interactive-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

/* ==========================================================================
   Interactive Background
   ========================================================================== */
function setupInteractiveBackground() {
    if (isTouchDevice || prefersReducedMotion || !interactiveBg) return;
    
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        requestAnimationFrame(() => {
            interactiveBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

/* ==========================================================================
   Typing Animation
   ========================================================================== */
const typingTextElement = document.getElementById('typing-text');
const phrases = [
    "Designing Mechanical Systems.",
    "Building Intelligent Robots.",
    "Engineering Embedded Solutions.",
    "Connecting Engineering with AI."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    if (!typingTextElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Faster when deleting
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100; // Normal typing speed
    }
    
    // If finished typing a phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingDelay = 2000; // Pause at the end
        isDeleting = true;
    } 
    // If finished deleting a phrase
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 500; // Pause before typing new phrase
    }
    
    setTimeout(typeEffect, typingDelay);
}

/* ==========================================================================
   Initialize and Set Config Links
   ========================================================================== */
function setupLinks() {
    const heroLinkedin = document.getElementById('hero-linkedin');
    const heroGithub = document.getElementById('hero-github');
    
    if (heroLinkedin) heroLinkedin.href = portfolioConfig.linkedin;
    if (heroGithub) heroGithub.href = portfolioConfig.github;
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupInteractiveBackground();
    setupLinks();
    
    if (typingTextElement) {
        setTimeout(typeEffect, 1000); // Initial delay
    }
    
    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/* ==========================================================================
   Project Data & Modals
   ========================================================================== */
const projectData = {
    'mecanum': {
        title: 'Modular Mecanum-Wheel Mobile Manipulator',
        category: 'Robotics / Embedded Systems',
        image: 'assets/projects/mecanum/full cad.png',
        description: 'Designed the mechanical CAD and executed system integration for a modular mobile manipulator.',
        details: [
            'Engineered a decentralized Master-Slave control architecture using ESP32 over ESP-NOW.',
            'Designed custom PCBs for reliable sensor and actuator interfacing.',
            'Programmed the Inverse Kinematics solver for precise omnidirectional movement.',
            'Developed an autonomous navigation state machine.',
            'Developed a Web-Based HMI.',
            'Included a real-time 3D Digital Twin for manual-to-autonomous teleoperation.'
        ],
        tools: ['ESP32', 'ESP-NOW', 'Inverse Kinematics', 'CAD', 'PCB Design', 'Web HMI']
    },
    'air-powered': {
        title: 'Air-Powered Vehicle Project',
        category: 'Machine Design',
        image: 'assets/projects/air-powered/full_car.jpg',
        document: 'assets/projects/air-powered/Brochure.pdf',
        description: 'Designed and built a 2.7 kg compressed-air vehicle utilizing mechanical principles and embedded control.',
        details: [
            'Achieved 4th place out of 64 teams with a top speed of 2.7 m/s.',
            'Propulsion and pressure systems included a 5 mm nozzle and 10 bar tank using Thick Cylinder Theory.',
            'Developed an ESP32-based wireless braking system.',
            'Mobile control was used for stopping the vehicle remotely.'
        ],
        tools: ['SolidWorks', 'ESP32', 'Thick Cylinder Theory', 'Mechanical Design']
    },
    'bottling': {
        title: 'Automated Bottling & Sorting Line',
        category: 'Industrial Automation',
        description: 'Designed a full production line simulation demonstrating advanced PLC logic and process control.',
        details: [
            'Designed a full production line simulation using Factory I/O.',
            'Implemented filling and height-based sorting mechanics.',
            'Programmed PLC logic using Siemens TIA Portal.',
            'Automated tank and sensor control with alarms and process management.',
            'Developed HMI interface for real-time monitoring.'
        ],
        tools: ['Siemens TIA Portal', 'Factory I/O', 'PLC', 'HMI']
    },
    'fordgobike': {
        title: 'Ford GoBike Data Analysis',
        category: 'Data Analysis',
        image: 'assets/projects/fordgobike/1st_dashboard_page.png',
        description: 'Extensive data analysis and interactive dashboard creation for Ford GoBike trip data.',
        details: [
            'Set up PostgreSQL database with schema for fact and dimension tables.',
            'Performed data preprocessing using Python/Pandas (missing values, outliers, encoding).',
            'Engineered features including trip duration, weekend flag, and age groups.',
            'Conducted exploratory data analysis on demographics and temporal trends.',
            'Built an interactive dashboard with dynamic slicers for date, user type, gender, and age group.'
        ],
        tools: ['Python', 'Pandas', 'PostgreSQL', 'Dashboards']
    }
};

const modalContainer = document.getElementById('modal-container');

function openModal(contentHtml) {
    modalContainer.innerHTML = contentHtml;
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add close listener
    const closeBtn = modalContainer.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

function closeModal() {
    modalContainer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    setTimeout(() => {
        modalContainer.innerHTML = ''; // Clear content after animation
    }, 300);
}

// Close on outside click
modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
        closeModal();
    }
});

// Attach listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent opening if clicking on something else inside (like a specific link, though we don't have them yet)
        const projectId = card.getAttribute('data-project');
        if (projectData[projectId]) {
            const data = projectData[projectId];
            
            let imageHtml = '';
            if (data.image) {
                imageHtml = `
                    <div class="modal-img-wrapper">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                `;
            }
            
            let detailsList = data.details.map(d => `<li>${d}</li>`).join('');
            
            let documentHtml = '';
            if (data.document) {
                documentHtml = `
                    <div class="modal-actions">
                        <a href="${data.document}" target="_blank" class="btn btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            View Project Brochure
                        </a>
                    </div>
                `;
            }

            const modalHtml = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">${data.title}</h3>
                        <button class="modal-close" aria-label="Close Modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${imageHtml}
                        <div class="project-category">${data.category}</div>
                        <p>${data.description}</p>
                        
                        <div class="modal-project-details">
                            <h4>Technical Details:</h4>
                            <ul>
                                ${detailsList}
                            </ul>
                        </div>
                        
                        <div class="project-tags" style="margin-top: 1.5rem;">
                            ${data.tools.map(t => `<span>${t}</span>`).join('')}
                        </div>
                        
                        ${documentHtml}
                    </div>
                </div>
            `;
            
            openModal(modalHtml);
        }
    });
});

/* ==========================================================================
   CV Viewer logic
   ========================================================================== */
const viewCvBtn = document.getElementById('btn-view-cv');
if (viewCvBtn) {
    viewCvBtn.addEventListener('click', () => {
        const modalHtml = `
            <div class="modal-content" style="height: 90vh;">
                <div class="modal-header">
                    <h3 class="modal-title">Ali Mohamed - CV</h3>
                    <button class="modal-close" aria-label="Close Modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="modal-body" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                    <iframe src="assets/documents/Ali_CV.pdf" class="pdf-container" style="flex: 1; height: 100%;"></iframe>
                    <div style="padding: 1rem; text-align: center; background: var(--bg-card); border-top: 1px solid var(--border-color);">
                        <a href="assets/documents/Ali_CV.pdf" download="Ali_Mohamed_CV.pdf" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        `;
        openModal(modalHtml);
    });
}

/* ==========================================================================
   Certifications Data & Modals
   ========================================================================== */
const certData = {
    'cswp': {
        title: 'Certified SOLIDWORKS Professional (CSWP)',
        file: 'assets/certifications/CSWP Certificate.pdf'
    },
    'cswa': {
        title: 'Certified SOLIDWORKS Associate (CSWA)',
        file: 'assets/certifications/CSWA Certificate.pdf'
    },
    'llm': {
        title: 'Building LLM Applications with Prompt Engineering',
        file: 'assets/certifications/Building LLM Applications With Prompt Engineering.pdf'
    },
    'nti': {
        title: 'Embedded System Intern',
        file: 'assets/certifications/NTI Embedded System Intern.pdf'
    },
    'ai': {
        title: 'AI for All From Basics to GenAI Practice',
        file: 'assets/certifications/AI for All From Basics to GenAI Practice.pdf'
    }
};

document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        const certId = card.getAttribute('data-cert');
        if (certData[certId]) {
            const data = certData[certId];
            
            const modalHtml = `
                <div class="modal-content" style="height: 90vh;">
                    <div class="modal-header">
                        <h3 class="modal-title">${data.title}</h3>
                        <button class="modal-close" aria-label="Close Modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="modal-body" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                        <iframe src="${data.file}" class="pdf-container" style="flex: 1; height: 100%;"></iframe>
                        <div style="padding: 1rem; text-align: center; background: var(--bg-card); border-top: 1px solid var(--border-color);">
                            <a href="${data.file}" download class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Download Certificate
                            </a>
                        </div>
                    </div>
                </div>
            `;
            openModal(modalHtml);
        }
    });
});

/* ==========================================================================
   Contact Form & Social Links
   ========================================================================== */
// Populate social links from config
document.addEventListener('DOMContentLoaded', () => {
    if (typeof portfolioConfig !== 'undefined') {
        const lnLink = document.getElementById('social-linkedin');
        const ghLink = document.getElementById('social-github');
        const gcLink = document.getElementById('social-grabcad');
        const gsLink = document.getElementById('social-scholar');
        
        if (lnLink && portfolioConfig.social.linkedin) {
            lnLink.href = portfolioConfig.social.linkedin;
        }
        if (ghLink && portfolioConfig.social.github) {
            ghLink.href = portfolioConfig.social.github;
        }
        if (gcLink && portfolioConfig.social.grabcad) {
            gcLink.href = portfolioConfig.social.grabcad;
        }
        if (gsLink && portfolioConfig.social.googleScholar) {
            gsLink.href = portfolioConfig.social.googleScholar;
        }
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const statusDiv = document.getElementById('form-status');
        const btn = contactForm.querySelector('button[type="submit"]');
        
        // Visual feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            statusDiv.textContent = 'Message sent successfully! I will get back to you soon.';
            statusDiv.className = 'form-status success';
            
            // Clear message after 5 seconds
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = 'form-status';
            }, 5000);
        }, 1500);
    });
}

/* ==========================================================================
   Footer & Back to Top
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Inject footer social links
    const footerSocialContainer = document.getElementById('footer-social-links');
    if (footerSocialContainer && typeof portfolioConfig !== 'undefined') {
        const socialData = [
            { id: 'linkedin', url: portfolioConfig.social.linkedin, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>' },
            { id: 'github', url: portfolioConfig.social.github, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>' },
            { id: 'grabcad', url: portfolioConfig.social.grabcad, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>' }
        ];

        let html = '';
        socialData.forEach(item => {
            if (item.url) {
                html += `<a href="${item.url}" target="_blank" aria-label="${item.id}" class="social-icon">${item.icon}</a>`;
            }
        });
        footerSocialContainer.innerHTML = html;
    }

    // Back to top logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
