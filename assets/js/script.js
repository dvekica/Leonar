/**
 * ===== LEONAR PRODUCTION - ГЛАВНЫЙ JAVASCRIPT ФАЙЛ =====
 * Этот файл содержит всю интерактивную функциональность сайта
 */

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let isMenuOpen = false;
let scrollPosition = 0;

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Leonar Production сайт загружен!');

    // Инициализация всех компонентов
    initializeNavigation();
    initializeFAQ();
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();

    // Приветствие в консоли
    console.log(`
    ╔══════════════════════════════════════╗
    ║          LEONAR PRODUCTION           ║
    ║       Лучший продукт для Minecraft   ║
    ╚══════════════════════════════════════╝
    `);
});

// ===== НАВИГАЦИЯ И МОБИЛЬНОЕ МЕНЮ =====
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                smoothScrollTo(targetSection);

                if (isMenuOpen) toggleMobileMenu();
            }
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    isMenuOpen = !isMenuOpen;

    if (navMenu && mobileToggle) {
        if (isMenuOpen) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(15, 15, 35, 0.98)';
            navMenu.style.padding = '2rem';
            navMenu.style.backdropFilter = 'blur(20px)';
            navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            mobileToggle.classList.add('active');
        } else {
            navMenu.style.display = 'none';
            mobileToggle.classList.remove('active');
        }
    }
}

// ===== FAQ АККОРДЕОН =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                if (isActive) item.classList.remove('active');
                else item.classList.add('active');

                addClickAnimation(question);
            });
        }
    });
}

// ===== ЭФФЕКТЫ ПРОКРУТКИ И АНИМАЦИИ =====
function initializeScrollEffects() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                if (entry.target.classList.contains('feature-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .faq-item, .section-header');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== АНИМАЦИИ =====
function initializeAnimations() {
    const logoLarge = document.querySelector('.logo-icon-large');
    if (logoLarge) {
        logoLarge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.8)';
        });
        logoLarge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
        });
    }
    animateCounters();
}

// Анимация счетчиков
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/\D/g, ''));
        if (numericValue) {
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    const suffix = target.includes('K') ? 'K+' : target.includes('%') ? '%' : '';
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        }
    });
}

// ===== КНОПКИ =====
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            addRippleEffect(this, e);
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Купить') || buttonText.includes('Загрузить')) handlePurchaseClick();
            else if (buttonText.includes('Узнать больше')) smoothScrollTo(document.querySelector('#features'));
        });

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function smoothScrollTo(element) {
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        window.scrollTo({
            top: element.offsetTop - headerHeight - 20,
            behavior: 'smooth'
        });
    }
}

function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

function addClickAnimation(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => { element.style.transform = 'scale(1)'; }, 150);
}

function handlePurchaseClick() {
    showNotification('🚀 Спасибо за интерес к Leonar Production! Сейчас вы будете перенаправлены на страницу покупки.', 'success');
    setTimeout(() => console.log('Перенаправление на страницу покупки...'), 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '12px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease-out';

    switch(type) {
        case 'success': notification.style.background = 'linear-gradient(135deg,#10b981,#059669)'; break;
        case 'error': notification.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)'; break;
        case 'warning': notification.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; break;
       
