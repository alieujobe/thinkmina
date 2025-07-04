document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
  menuToggle.innerHTML = '☰';
  
  const headerInner = document.querySelector('.header-inner');
  const navLinks = document.querySelector('.nav-links');
  
  // Add menu toggle button to header
  if (headerInner && navLinks) {
    headerInner.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    });
  }

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.innerHTML = '☰';
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });

  // ===== TESTIMONIAL CAROUSEL =====
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  if (testimonialCarousel) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-nav';
    
    // Create dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
      
      dotsContainer.appendChild(dot);
    });
    
    testimonialCarousel.appendChild(dotsContainer);
    
    let currentIndex = 0;
    const dots = document.querySelectorAll('.carousel-dot');
    
    function showTestimonial(index) {
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
      });
      
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
  }

  // ===== PRICING TOGGLE =====
  const pricingToggleBtns = document.querySelectorAll('.toggle-btn');
  if (pricingToggleBtns.length) {
    pricingToggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        pricingToggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const target = this.getAttribute('aria-controls');
        document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
          panel.hidden = panel.id !== target;
        });
      });
    });
  }

  // ===== BLOG CONTENT TOGGLE =====
  document.querySelectorAll('.toggle-content-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const contentId = this.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      this.setAttribute('aria-expanded', !isExpanded);
      content.hidden = isExpanded;
      this.textContent = isExpanded ? 'Read More' : 'Show Less';
    });
  });

  // ===== FORM VALIDATION =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const messageInput = document.getElementById('messageInput');
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = 'var(--danger)';
        isValid = false;
      } else {
        nameInput.style.borderColor = '#ddd';
      }
      
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailInput.style.borderColor = 'var(--danger)';
        isValid = false;
      } else {
        emailInput.style.borderColor = '#ddd';
      }
      
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = 'var(--danger)';
        isValid = false;
      } else {
        messageInput.style.borderColor = '#ddd';
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      }
    });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section, .card, .blog-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('fade-in');
      }
    });
  };
  
  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // ===== VIDEO PLAYBACK OPTIMIZATION =====
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    // Ensure video plays inline on mobile
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    
    // Mute video by default (required for autoplay on many browsers)
    heroVideo.muted = true;
    
    // Attempt to play video (some browsers require this)
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }
});

// ===== LOAD FONTS =====
function loadFonts() {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

loadFonts();