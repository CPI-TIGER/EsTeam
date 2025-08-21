// --- Simple Theme Toggle ---
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update theme icon (SVG)
  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');
  
  if (moonIcon && sunIcon) {
    if (theme === 'light') {
      moonIcon.style.opacity = '0';
      sunIcon.style.opacity = '1';
    } else {
      moonIcon.style.opacity = '1';
      sunIcon.style.opacity = '0';
    }
  }
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// --- Background Animations ---
// Matrix Rain Background Animation
const createMatrixRain = () => {
  const container = document.createElement('div');
  container.className = 'matrix-rain';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.15;
  `;

  // Reduce number of columns for better performance
  const columns = Math.floor(window.innerWidth / 20);
  
  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.style.cssText = `
      position: absolute;
      top: -100px;
      left: ${i * 20}px;
      width: 20px;
      height: 100vh;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: var(--accent);
      text-align: center;
      text-shadow: 0 0 5px var(--accent);
      animation: matrixFall ${3 + Math.random() * 2}s linear infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    
    // Reduce number of characters per column
    const chars = '01';
    let columnText = '';
    for (let j = 0; j < 20; j++) {
      columnText += chars[Math.floor(Math.random() * chars.length)] + '\n';
    }
    column.textContent = columnText;
    
    container.appendChild(column);
  }
  
  document.body.appendChild(container);
};

// Floating Code Background Animation
const createFloatingCode = () => {
  const container = document.createElement('div');
  container.className = 'floating-code';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.12;
  `;

  // Reduce number of floating elements
  const codeElements = [
    '{ }', 'function()', 'const', 'let', 'var', 'return', 'if()', 'for()', 'class', 'import'
  ];
  
  for (let i = 0; i < 8; i++) {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      font-family: 'Courier New', monospace;
      font-size: ${12 + Math.random() * 8}px;
      color: var(--accent);
      opacity: 0.8;
      text-shadow: 0 0 8px var(--accent);
      animation: floatCode ${8 + Math.random() * 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    element.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
    
    container.appendChild(element);
  }
  
  document.body.appendChild(container);
};

// --- Loading Screen ---
const createLoadingScreen = () => {
  const loadingContainer = document.createElement('div');
  loadingContainer.id = 'loading-screen';
  loadingContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--primary-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(10px);
  `;
  
  const gear = document.createElement('div');
  gear.innerHTML = `
    <img src="Gear.png" alt="Loading Gear" style="width: 80px; height: 80px; filter: drop-shadow(0 0 20px var(--accent));">
  `;
  gear.style.cssText = `
    animation: gearSpin 2s linear infinite;
  `;
  
  loadingContainer.appendChild(gear);
  document.body.appendChild(loadingContainer);
  
  // Remove loading screen after 2 seconds
  setTimeout(() => {
    loadingContainer.style.opacity = '0';
    loadingContainer.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loadingContainer.remove();
    }, 500);
  }, 2000);
};

// --- Enhanced Card Hover Effects ---
document.addEventListener('DOMContentLoaded', () => {
  // Add enhanced hover effects to portfolio cards
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 15px 40px rgba(0,255,136,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 10px 30px rgba(0,255,136,0.1)';
    });
  });
});

// --- Init ---
// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Show loading screen first
  createLoadingScreen();
  
  // Start background animations immediately for better performance
  setTimeout(() => {
    createMatrixRain();
    createFloatingCode();
  }, 100);
  
  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add theme toggle functionality
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);
});
