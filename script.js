document.addEventListener('DOMContentLoaded', () => {

  lucide.createIcons();

  const introScreen = document.getElementById('introScreen');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const mainContent = document.getElementById('mainContent');
  const introHeartsBg = document.getElementById('introHeartsBg');

  const introHeartSymbols = ['♥', '♡', '❤'];
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.classList.add('intro-floating-heart');
    heart.textContent = introHeartSymbols[Math.floor(Math.random() * introHeartSymbols.length)];
    const size = Math.random() * 18 + 10;
    const left = Math.random() * 100;
    const dur = Math.random() * 10 + 8;
    const del = Math.random() * 6;
    heart.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
    `;
    introHeartsBg.appendChild(heart);
  }

  btnNo.addEventListener('click', () => {
    btnNo.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    btnNo.style.transform = 'scale(0) rotate(20deg)';
    btnNo.style.opacity = '0';
    setTimeout(() => {
      btnNo.style.display = 'none';
    }, 400);
  });

  btnYes.addEventListener('click', () => {
    introScreen.classList.add('fade-out');
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.style.display = 'block';

      window.scrollTo(0, 0);

      lucide.createIcons();
    }, 800);
  });

  const heartsContainer = document.getElementById('heartsContainer');
  const heartSymbols = ['♥', '♡', '❤', '❥', '💕'];

  function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * 8;

    heart.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
      createFloatingHeart();
    }, (duration + delay) * 1000);
  }

  for (let i = 0; i < 20; i++) {
    createFloatingHeart();
  }
  let sparkleThrottle = false;

  document.addEventListener('mousemove', (e) => {
    if (sparkleThrottle) return;
    sparkleThrottle = true;

    setTimeout(() => {
      sparkleThrottle = false;
    }, 60);

    const sparkle = document.createElement('div');
    sparkle.classList.add('cursor-sparkle');

    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;

    sparkle.style.left = (e.clientX + offsetX) + 'px';
    sparkle.style.top = (e.clientY + offsetY) + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });


  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableSelectors = [
    '.letter-card',
    '.reason-card',
    '.gallery-item',
    '.poem-card',
    '.promise-item'
  ];

  animatableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      scrollObserver.observe(el);
    });
  });


  const heroBtn = document.getElementById('heroBtn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(heroBtn.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }


  document.addEventListener('click', (e) => {
    createHeartBurst(e.clientX, e.clientY);
  });

  function createHeartBurst(x, y) {
    const burstCount = 6;
    for (let i = 0; i < burstCount; i++) {
      const heart = document.createElement('span');
      heart.textContent = '♥';
      heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${Math.random() * 14 + 8}px;
        color: ${getRandomBrownShade()};
        pointer-events: none;
        z-index: 9999;
        opacity: 1;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;

      document.body.appendChild(heart);

      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 60 + 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 20;

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${tx}px, ${ty}px) scale(0.3) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 850);
    }
  }

  function getRandomBrownShade() {
    const shades = [
      '#8B5E3C', '#A0724E', '#C4956A',
      '#D4A574', '#E8CCAC', '#5C3A21',
      '#C0392B'
    ];
    return shades[Math.floor(Math.random() * shades.length)];
  }



  const hero = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (hero && scrollY < window.innerHeight) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
      }
    }
  });

  const reasonCards = document.querySelectorAll('.reason-card');

  reasonCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });


  const poemText = document.querySelector('.poem-text');
  if (poemText) {
    const originalHTML = poemText.innerHTML;
    let hasAnimated = false;

    const poemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animatePoem(poemText, originalHTML);
          poemObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    poemObserver.observe(poemText);
  }

  function animatePoem(element, html) {
    const lines = html.split('<br>');
    element.innerHTML = '';

    lines.forEach((line, index) => {
      const span = document.createElement('span');
      span.innerHTML = line.trim();
      span.style.cssText = `
        display: block;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.6s ease-out;
        transition-delay: ${index * 0.4}s;
      `;
      element.appendChild(span);

      if (index < lines.length - 1) {
        element.appendChild(document.createElement('br'));
      }

      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 50);
    });
  }


  const letterCard = document.getElementById('letterCard');
  if (letterCard) {
    letterCard.addEventListener('mousemove', (e) => {
      const rect = letterCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      letterCard.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(139,94,60,0.08), transparent 50%),
        linear-gradient(145deg, #1a1a1a, #222222)
      `;
    });

    letterCard.addEventListener('mouseleave', () => {
      letterCard.style.background = 'linear-gradient(145deg, #1a1a1a, #222222)';
    });
  }


  let loveCode = '';
  const loveWord = 'love';

  document.addEventListener('keydown', (e) => {
    loveCode += e.key.toLowerCase();
    if (loveCode.length > loveWord.length) {
      loveCode = loveCode.slice(-loveWord.length);
    }
    if (loveCode === loveWord) {
      triggerHeartRain();
      loveCode = '';
    }
  });

  function triggerHeartRain() {
    const duration = 3000;
    const interval = 50;
    let elapsed = 0;

    const rainInterval = setInterval(() => {
      elapsed += interval;
      if (elapsed >= duration) {
        clearInterval(rainInterval);
        return;
      }

      const heart = document.createElement('span');
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.cssText = `
        position: fixed;
        top: -20px;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 24 + 12}px;
        color: ${getRandomBrownShade()};
        pointer-events: none;
        z-index: 99999;
        opacity: 1;
        animation: rainHeart ${Math.random() * 2 + 1.5}s linear forwards;
      `;

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, interval);

    if (!document.getElementById('rainStyle')) {
      const style = document.createElement('style');
      style.id = 'rainStyle';
      style.textContent = `
        @keyframes rainHeart {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

});
