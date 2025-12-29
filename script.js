
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('user-name').textContent = data.personal.name;
        document.getElementById('user-role').textContent = data.personal.role;
        document.getElementById('user-description').textContent = data.personal.description;
        document.getElementById('user-image').src = data.personal.image;
        document.getElementById('footer-name').textContent = data.personal.name;

        
        const aboutText = document.getElementById('about-text');
        data.about.paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutText.appendChild(p);
        });

        
        const skillsSection = document.getElementById('skills-section');
        
        // Skills
        const frontendDiv = createSkillCategory('Front-end', data.about.skills.frontend);
        skillsSection.appendChild(frontendDiv);
        
        
        const backendDiv = createSkillCategory('Back-end', data.about.skills.backend);
        skillsSection.appendChild(backendDiv);
        
        
        const otherDiv = createSkillCategory('Outras Habilidades', data.about.skills.other);
        skillsSection.appendChild(otherDiv);

        // Projects Section
        const projectsGrid = document.getElementById('projects-grid');
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        // Articles Section
        const articlesGrid = document.getElementById(`articles-grid`);
        data.articles.forEach(articles => {
            const articleCard = createArticleCard(articles);
            articlesGrid.appendChild(articleCard);
        });

        // Social Links
        const socialLinks = document.getElementById('social-links');
        for (const [platform, url] of Object.entries(data.social)) {
            if (url) {
                const iconClass = getSocialIconClass(platform);
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.innerHTML = `<i class="${iconClass}"></i>`;
                socialLinks.appendChild(a);
            }
        }
    })
    .catch(error => console.error('Error loading data:', error));

// Skill category
function createSkillCategory(title, skills) {
    const div = document.createElement('div');
    div.className = 'skill-category';
    
    const h3 = document.createElement('h3');
    h3.className = 'mono';
    h3.textContent = title;
    div.appendChild(h3);
    
    const skillsDiv = document.createElement('div');
    skillsDiv.className = 'skills';
    
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill mono';
        span.textContent = skill;
        skillsDiv.appendChild(span);
    });
    
    div.appendChild(skillsDiv);
    return div;
}


// Article card
function createArticleCard(articles) {
    const card = document.createElement('div');
    card.className = 'articles-card';
    
    // articles Image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'articles-image';
    const img = document.createElement('img');
    img.src = articles.image;
    img.alt = articles.name;
    imageDiv.appendChild(img);
    card.appendChild(imageDiv);
    
    // articles Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'articles-info';
    
    const h3 = document.createElement('h3');
    h3.textContent = articles.name;
    infoDiv.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = articles.description;
    infoDiv.appendChild(p);
    
    
    const techDiv = document.createElement('div');
    techDiv.className = 'articles-tech';
    articles.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech mono';
        span.textContent = tech;
        techDiv.appendChild(span);
    });
    infoDiv.appendChild(techDiv);
    
    
    const linksDiv = document.createElement('div');
    linksDiv.className = 'articles-links';
    for (const [type, url] of Object.entries(articles.links)) {
        if (url) {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            
            if (type === 'code') {
                a.innerHTML = '<i class="fas fa-external-link-alt"></i> Artigo';
            } else if (type === 'demo') {
                a.innerHTML = '<i class="fas fa-external-link-alt"></i> Demo';
            }
            
            linksDiv.appendChild(a);
        }
    }
    infoDiv.appendChild(linksDiv);
    
    card.appendChild(infoDiv);
    return card;
}


// Project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Project Image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-image';
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.name;
    imageDiv.appendChild(img);
    card.appendChild(imageDiv);
    
    // Project Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'project-info';
    
    const h3 = document.createElement('h3');
    h3.textContent = project.name;
    infoDiv.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = project.description;
    infoDiv.appendChild(p);
    
    
    const techDiv = document.createElement('div');
    techDiv.className = 'project-tech';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech mono';
        span.textContent = tech;
        techDiv.appendChild(span);
    });
    infoDiv.appendChild(techDiv);
    
    
    const linksDiv = document.createElement('div');
    linksDiv.className = 'project-links';
    for (const [type, url] of Object.entries(project.links)) {
        if (url) {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            
            if (type === 'code') {
                a.innerHTML = '<i class="fab fa-github"></i> Código';
            } else if (type === 'demo') {
                a.innerHTML = '<i class="fas fa-external-link-alt"></i> Demo';
            }
            
            linksDiv.appendChild(a);
        }
    }
    infoDiv.appendChild(linksDiv);
    
    card.appendChild(infoDiv);
    return card;
}


// Social icon class
function getSocialIconClass(platform) {
    switch (platform) {
        case 'GitHub': return 'fab fa-github';
        case 'LinkedIn': return 'fab fa-linkedin';
        case 'Email': return 'fas fa-envelope';
        case 'Dev.to': return 'fab fa-dev';
        case 'Spotify': return 'fab fa-spotify';
        case 'Twitter': return 'fab fa-twitter'; //<i class="fa-brands fa-x-twitter"></i>
        default: return 'fas fa-link';
    }
}

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();


const typewriterTexts = ['Desenvolvedor Full Stack', 'Especialista em c-sharp', 'Entusiasta de IA', 'Contribuidor Open Source'];
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function typeWriter() {
    const currentText = typewriterTexts[currentTextIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, 500);
    } else {
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, speed);
    }
}

// Start the typewriter effect
setTimeout(typeWriter, 1000);