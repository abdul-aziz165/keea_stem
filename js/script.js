const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile menu toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (header) {
    if (scrollTop > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animation observer for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-card, .testimonial-card, .program-card, .event-card, .team-card, .mvv-card, .benefit-card, .involvement-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Event filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      eventCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// // Donation amount buttons
// const amountButtons = document.querySelectorAll('.amount-btn');
// const customAmountInput = document.querySelector('.custom-amount');

// if (amountButtons.length > 0) {
//   amountButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       amountButtons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');
//       if (customAmountInput) {
//         customAmountInput.value = '';
//       }
//     });
//   });
// }

// if (customAmountInput) {
//   customAmountInput.addEventListener('input', () => {
//     amountButtons.forEach(btn => btn.classList.remove('active'));
//   });
// }

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Create mailto link to send email to abdulazizransali@gmail.com
    const mailtoLink = `mailto:abdulazizransali@gmail.com?subject=${encodeURIComponent('Contact Form: ' + subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      this.style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// // Newsletter form handling
// const newsletterForms = document.querySelectorAll('.newsletter-form');
// newsletterForms.forEach(form => {
//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const email = this.querySelector('input[type="email"]').value;
//     const button = this.querySelector('button');
//     const originalText = button.textContent;
//     button.textContent = 'Subscribing...';
//     button.disabled = true;
    
//     setTimeout(() => {
//       alert(`Thank you for subscribing with ${email}! You'll receive updates about our programs and events.`);
//       this.reset();
//       button.textContent = originalText;
//       button.disabled = false;
//     }, 1500);
//   });
// });

// Stats animation
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      const originalText = stat.textContent;
      const suffix = originalText.replace(/[0-9,]/g, '');
      stat.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 20);
  });
};

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

// Image lazy loading
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      
      const newImg = new Image();
      newImg.onload = () => {
        img.style.opacity = '1';
      };
      newImg.src = img.src;
      
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.1);
  font-size: 18px;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'translateY(-3px)';
  scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'translateY(0)';
  scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
});

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.style.borderColor = '#dc2626';
        input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
      } else {
        input.style.borderColor = '#059669';
        input.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
      }
    });
    
    input.addEventListener('focus', () => {
      input.style.borderColor = '#2563eb';
      input.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
    });
  });
});

console.log('STEM Future website initialized successfully!');
