// ========== INICIALIZAR AOS ==========
AOS.init({
    duration: 800,
    once: true,
    offset: 80
});

// ========== VARIÁVEL GLOBAL ==========
let currentLang = 'pt';

// ========== FUNÇÃO DE TRADUÇÃO ==========
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;
    
    // Atualizar botões ativos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim().toUpperCase() === lang.toUpperCase()) {
            btn.classList.add('active');
        }
    });
    
    // Aplicar traduções nos elementos com data-lang
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

// ========== MENU MOBILE ==========
const mobileToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// ========== SMOOTH SCROLL ==========
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

// ========== FORMULÁRIO DE CONTATO ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            const messages = {
                pt: '✓ Mensagem enviada com sucesso! Entrarei em contato em breve.',
                en: '✓ Message sent successfully! I will contact you soon.',
                es: '✓ ¡Mensaje enviado con éxito! Te contactaré pronto.'
            };
            alert(messages[currentLang] || messages.pt);
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ========== INICIAR COM PORTUGUÊS ==========
changeLanguage('pt');