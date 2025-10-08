document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const dropdowns = document.querySelectorAll('.has-dropdown');
    const themeToggle = document.querySelector('.theme-toggle');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    // Mobile menu toggle with animation
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('nav-active');
        
        // Prevent scrolling when menu is open
        if (navbar.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbar.classList.contains('nav-active')) {
            navbar.classList.remove('nav-active');
            document.body.style.overflow = '';
        }
    });

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        // For mobile: toggle dropdowns on click
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                        
                        // Add slide-up animation class
                        const otherDropdown = other.querySelector('.dropdown');
                        otherDropdown.style.animation = 'slideUp 0.3s forwards';
                        
                        // Remove animation class after it completes
                        setTimeout(() => {
                            otherDropdown.style.animation = '';
                        }, 300);
                    }
                });
                
                // Add slide animation for current dropdown
                const currentDropdown = dropdown.querySelector('.dropdown');
                if (dropdown.classList.contains('active')) {
                    currentDropdown.style.animation = 'slideDown 0.3s forwards';
                } else {
                    currentDropdown.style.animation = 'slideUp 0.3s forwards';
                    setTimeout(() => {
                        currentDropdown.style.animation = '';
                    }, 300);
                }
            }
        });
    });

    // Theme toggle with enhanced transitions
    let isDark = true; // Default dark theme
    
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            // Switch to dark theme
            transformToTheme(
                '#0a0a12', 
                '#ffffff', 
                'rgba(16, 16, 26, 0.7)', 
                'rgba(20, 20, 35, 0.8)'
            );
            
            // Switch icons
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            // Switch to light theme
            transformToTheme(
                '#ffffff', 
                '#0a0a12', 
                'rgba(255, 255, 255, 0.8)', 
                'rgba(240, 240, 255, 0.9)'
            );
            
            // Switch icons
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });
    
    // Helper function for smooth theme transition
    function transformToTheme(bgColor, textColor, navBg, dropdownBg) {
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--nav-bg', navBg);
        document.documentElement.style.setProperty('--dropdown-bg', dropdownBg);
        
        // Adjust gradient background and text description color
        if (isDark) {
            document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #0a0a12, #151530)');
            document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
            document.documentElement.style.setProperty('--text-description', 'rgba(255, 255, 255, 0.7)');
        } else {
            document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #ffffff, #f0f4ff)');
            document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
            document.documentElement.style.setProperty('--text-description', 'rgba(0, 0, 0, 0.7)');
        }
        
        // Add transition class to body for smooth color changes
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    }

    // Enhanced search functionality
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });

    // Handle search on enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });
    
    // Animated search focus
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('search-focused');
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('search-focused');
    });
    
    function performSearch(query) {
        // Add your search logic here
        console.log('Searching for:', query);
        
        // Show visual feedback
        searchBtn.classList.add('search-active');
        setTimeout(() => {
            searchBtn.classList.remove('search-active');
        }, 300);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            navbar.classList.remove('nav-active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });
    
    // Add scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Inject CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        
        .search-focused {
            box-shadow: 0 0 0 3px var(--primary-glow) !important;
        }
        
        .search-active {
            animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .theme-transition {
            transition: background 0.5s ease, color 0.5s ease;
        }
        
        .scrolled {
            padding: 0.7rem 2rem;
            background: var(--nav-bg);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 576px) {
            .scrolled {
                padding: 0.7rem 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});

  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-on-scroll');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% visible
    });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
  });

    // Scroll-trigger animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.3
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Replace thumbnail with video on click
    function playVideo(container) {
      container.classList.add('playing');
    }

const fadeSection = document.getElementById('fade-section');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
    rect.bottom >= 0
  );
}

function onScroll() {
  if (isInViewport(fadeSection)) {
    fadeSection.classList.add('in-view');
    window.removeEventListener('scroll', onScroll);
  }
}

// Listen for scroll and also check on load
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);



const track = document.querySelector('.slider-track');
const originalSlides = Array.from(document.querySelectorAll('.slide'));
let currentIndex = 0;
let isPaused = false;

// Clone first 3 slides for infinite loop
originalSlides.slice(0, 3).forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

// Function to calculate slide width dynamically
function getSlideWidth() {
  const slide = document.querySelector('.slide');
  return slide ? slide.offsetWidth + 30 : 0; // 30px is the gap
}

function slideNext() {
  if (isPaused) return;

  const slideWidth = getSlideWidth();
  currentIndex++;
  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  if (currentIndex === originalSlides.length) {
    setTimeout(() => {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      currentIndex = 0;
    }, 600);
  }
}

// Autoplay
let sliderInterval = setInterval(slideNext, 3000);

// Pause on hover
document.querySelectorAll('.slide').forEach(slide => {
  slide.addEventListener('mouseenter', () => isPaused = true);
  slide.addEventListener('mouseleave', () => isPaused = false);
});

// Recalculate on resize
window.addEventListener('resize', () => {
  // Just recalculate current position
  const slideWidth = getSlideWidth();
  track.style.transition = 'none';
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});




    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0
      );
    }

    function animateCounter(counterElement, target) {
      let count = 0;
      const speed = target / 100;

      const update = () => {
        if (count < target) {
          count += speed;
          counterElement.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counterElement.innerText = target;
        }
      };

      update();
    }

    function checkCounters() {
      const boxes = document.querySelectorAll('.counter-box:not(.counted)');

      boxes.forEach(box => {
        if (isInViewport(box)) {
          box.classList.add('fade-up');

          const counter = box.querySelector('.counter-number');
          const target = +box.getAttribute('data-count');

          animateCounter(counter, target);
          box.classList.add('counted');
        }
      });
    }

    window.addEventListener('scroll', checkCounters);
    window.addEventListener('load', checkCounters);



(function() {
  document.addEventListener('DOMContentLoaded', function () {
    const target = document.querySelector('#custom-fade-up-container .custom-fade-up');

    if (!target) return;

    function handleScroll() {
      const rect = target.getBoundingClientRect();
      const isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100;

      if (isVisible) {
        target.classList.add('visible');
        window.removeEventListener('scroll', handleScroll);
      }
    }

    // Use passive listener to avoid affecting performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Run on load in case it's already visible
    handleScroll();
  });
})();



(function() {
  document.addEventListener('DOMContentLoaded', function () {
    const divider = document.querySelector('#reveal-divider-container .reveal-divider');

    if (!divider) return;

    function onScroll() {
      const rect = divider.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight - 100) {
        divider.classList.add('visible');
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  });
})();


document.addEventListener('DOMContentLoaded', function () {
  const wrappers = document.querySelectorAll('.diagonal-horizontal-divider-wrapper');
  const HOVER_COLOR = '#ea00ffff';
  const ORIGINAL_COLOR = '#444';

  // Determine RECT_COUNT based on screen width
  function getRectCount() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return 80; // fewer rects on smaller screens
    }
    return 140; // default for larger screens
  }

  const RECT_COUNT = getRectCount();

  wrappers.forEach(wrapper => {
    const divider = wrapper.querySelector('.diagonal-horizontal-divider');
    if (!divider) return;

    divider.innerHTML = '';

    for (let i = 0; i < RECT_COUNT; i++) {
      const rect = document.createElement('div');
      rect.classList.add('diagonal-rect');
      rect.style.backgroundColor = ORIGINAL_COLOR;
      rect.style.transition = 'background-color 300ms ease';
      divider.appendChild(rect);
    }

    function revealDivider() {
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight - 100) {
        const rects = divider.querySelectorAll('.diagonal-rect');
        rects.forEach((rect, i) => {
          setTimeout(() => {
            rect.style.backgroundColor = HOVER_COLOR;
          }, i * 30);
        });

        divider.classList.add('visible');
        window.removeEventListener('scroll', revealDivider);
      }
    }

    divider.addEventListener('mouseenter', () => {
      const rects = divider.querySelectorAll('.diagonal-rect');
      rects.forEach(rect => (rect.style.backgroundColor = HOVER_COLOR));
    });

    divider.addEventListener('mouseleave', () => {
      const rects = divider.querySelectorAll('.diagonal-rect');
      rects.forEach(rect => (rect.style.backgroundColor = ORIGINAL_COLOR));
    });

    window.addEventListener('scroll', revealDivider, { passive: true });
    revealDivider();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.centered-text');

  function fadeUpOnScroll() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    texts.forEach(text => {
      const rect = text.getBoundingClientRect();

      if (rect.top <= windowHeight - 100) {
        text.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      } else {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
      }
    });
  }

  // Initialize styles
  texts.forEach(text => {
    text.style.opacity = '0';
    text.style.transform = 'translateY(20px)';
  });

  window.addEventListener('scroll', fadeUpOnScroll, { passive: true });
  fadeUpOnScroll();
});


  (function () {
    var iconObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          iconObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.icon-link').forEach(function(icon) {
      iconObserver.observe(icon);
    });
  })();