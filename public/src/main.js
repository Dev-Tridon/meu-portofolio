
// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 80
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Language System
const translations = {
    pt: {
        'lang.pt': 'PT',
        'lang.en': 'EN',
        'lang.es': 'ES',
        'nav.home': 'Início',
        'nav.projects': 'Projetos',
        'nav.expertise': 'Especialidades',
        'nav.contact': 'Contato',
        'nav.cta': 'Colaborar',
        'hero.tag': 'Desenvolvedor',
        'hero.greeting': 'Olá, sou',
        'hero.subtitle': 'Full Stack Developer',
        'hero.description': `Desenvolvedor de Software com experiência em backend e aplicações web.
Atuo na construção de sistemas estáveis, escaláveis e bem estruturados, alinhados às necessidades do negócio.`,
        'hero.cta.projects': 'Ver Projetos',
        'hero.cta.contact': 'Contato',
        'stats.projects': 'Projetos',
        'stats.satisfaction': 'Satisfação',
        'projects.title': 'Projetos Activos',
        'projects.subtitle': `Soluções empresariais que transcendem fronteiras, combinando tecnologia de ponta com design sofisticado para clientes globais.`,
        'projects.premium': 'Mercearia',
        'projects.multilingual': 'GSInfo',
        'projects.enterprise': 'Mobile PWA',
        'projects.project1.title': 'Sistema de Vendas RestFull',
        'projects.project1.description': `Sistema de gestão de estoques e análise de dados em tempo real.`,
        'projects.project2.title': 'Super moderno e adaptavel RestFull',
        'projects.project2.description': `Solução completa para Mercearias, bares e restaurantes com suporte a versão mobile. Sistema híbrido que funciona offline e sincroniza automaticamente, permitindo escalabilidade horizontal.`,
        'projects.project3.title': 'Versão Mobile do GSInfo',
        'projects.project3.description': `Corporativa para gestão empresarial com processamento de dados avançado e relatórios em tempo real. Sistema robusto para alta disponibilidade e segurança.`,
        'projects.stats.efficiency': 'Satisfação',
        'projects.stats.clients': 'Clientes',
        'projects.stats.downtime': 'Integrado ao Kit GSInfo após a compra',
        'contact.title': 'Conecte-se Globalmente',
        'contact.subtitle': 'Pronto para levar seu projeto ao próximo nível? Vamos criar algo extraordinário juntos.',
        'contact.email.title': 'Email',
        'contact.phone.title': 'Telefone',
        'contact.location.title': 'Localização',
        'contact.location.mozambique': 'Maputo, Moçambique',
        'contact.location.remote': 'Trabalho Remoto e Presencial no território nacional',
        'contact.social.title': 'Conecte-se',
        'contact.form.name': 'Nome Completo *',
        'contact.form.email': 'Email *',
        'contact.form.company': 'Empresa / Projeto',
        'contact.form.project': 'Mensagem *',
        'contact.form.submit': 'Enviar Mensagem',
        'footer.mission': `Arquiteto de soluções digitais globais, especializado em criar sistemas sofisticados que impulsionam negócios internacionais e conectam culturas através da tecnologia.`,
        'footer.available': 'Disponibilidade',
        'footer.timezone': 'Sempre que disponível',
        'footer.response': 'Resposta',
        'footer.hours': '24-48 horas',
        'footer.modality': 'Modalidade',
        'footer.remote': 'Remoto / Presencial',
        'footer.rights': 'Todos os direitos reservados.'
    },
    en: {
        'lang.pt': 'PT',
        'lang.en': 'EN',
        'lang.es': 'ES',
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.expertise': 'Expertise',
        'nav.contact': 'Contact',
        'nav.cta': 'Collaborate',
        'hero.tag': 'Developer',
        'hero.greeting': 'Hi, I am',
        'hero.subtitle': 'Full Stack Developer',
        'hero.description': `Software developer with experience in backend and web applications.
I build stable, scalable, and well-structured systems aligned with business needs.`,
        'hero.cta.projects': 'View Projects',
        'hero.cta.contact': 'Contact',
        'stats.projects': 'Projects',
        'stats.satisfaction': 'Satisfaction',
        'projects.title': 'Active Projects',
        'projects.subtitle': `Enterprise solutions that transcend borders, combining cutting-edge technology with sophisticated design for global clients.`,
        'projects.premium': 'Grocery',
        'projects.multilingual': 'GSInfo',
        'projects.enterprise': 'Mobile PWA',
        'projects.project1.title': 'RestFull Sales System',
        'projects.project1.description': `Inventory management and real-time data analysis system.`,
        'projects.project2.title': 'Modern and Adaptive RestFull',
        'projects.project2.description': `Complete solution for groceries, bars, and restaurants with mobile support. Hybrid system that works offline and syncs automatically, allowing horizontal scalability.`,
        'projects.project3.title': 'GSInfo Mobile Version',
        'projects.project3.description': `Corporate business management suite with advanced data processing and real-time reporting. Robust system for high availability and security.`,
        'projects.stats.efficiency': 'Satisfaction',
        'projects.stats.clients': 'Clients',
        'projects.stats.downtime': 'Integrated with GSInfo Kit after purchase',
        'contact.title': 'Connect Globally',
        'contact.subtitle': 'Ready to take your project to the next level? Let\'s create something extraordinary together.',
        'contact.email.title': 'Email',
        'contact.phone.title': 'Phone',
        'contact.location.title': 'Location',
        'contact.location.mozambique': 'Maputo, Mozambique',
        'contact.location.remote': 'Remote and On-site work within the country',
        'contact.social.title': 'Connect',
        'contact.form.name': 'Full Name *',
        'contact.form.email': 'Email *',
        'contact.form.company': 'Company / Project',
        'contact.form.project': 'Message *',
        'contact.form.submit': 'Send Message',
        'footer.mission': `Global digital solutions architect, specialized in creating sophisticated systems that drive international business and connect cultures through technology.`,
        'footer.available': 'Availability',
        'footer.timezone': 'Whenever available',
        'footer.response': 'Response',
        'footer.hours': '24-48 hours',
        'footer.modality': 'Modality',
        'footer.remote': 'Remote / On-site',
        'footer.rights': 'All rights reserved.'
    },
    es: {
        'lang.pt': 'PT',
        'lang.en': 'EN',
        'lang.es': 'ES',
        'nav.home': 'Inicio',
        'nav.projects': 'Proyectos',
        'nav.expertise': 'Especialidades',
        'nav.contact': 'Contacto',
        'nav.cta': 'Colaborar',
        'hero.tag': 'Desarrollador',
        'hero.greeting': 'Hola, soy',
        'hero.subtitle': 'Desarrollador Full Stack',
        'hero.description': `Desarrollador de software con experiencia en backend y aplicaciones web.
Construyo sistemas estables, escalables y bien estructurados alineados con las necesidades del negocio.`,
        'hero.cta.projects': 'Ver Proyectos',
        'hero.cta.contact': 'Contacto',
        'stats.projects': 'Proyectos',
        'stats.satisfaction': 'Satisfacción',
        'projects.title': 'Proyectos Activos',
        'projects.subtitle': `Soluciones empresariales que trascienden fronteras, combinando tecnología de vanguardia con diseño sofisticado para clientes globales.`,
        'projects.premium': 'Tienda',
        'projects.multilingual': 'GSInfo',
        'projects.enterprise': 'Mobile PWA',
        'projects.project1.title': 'Sistema de Ventas RestFull',
        'projects.project1.description': `Sistema de gestión de inventarios y análisis de datos en tiempo real.`,
        'projects.project2.title': 'RestFull Moderno y Adaptable',
        'projects.project2.description': `Solución completa para tiendas, bares y restaurantes con soporte móvil. Sistema híbrido que funciona offline y se sincroniza automáticamente, permitiendo escalabilidad horizontal.`,
        'projects.project3.title': 'Versión Móvil de GSInfo',
        'projects.project3.description': `Suite corporativa para gestión empresarial con procesamiento avanzado de datos e informes en tiempo real. Sistema robusto para alta disponibilidad y seguridad.`,
        'projects.stats.efficiency': 'Satisfacción',
        'projects.stats.clients': 'Clientes',
        'projects.stats.downtime': 'Integrado al Kit GSInfo tras la compra',
        'contact.title': 'Conéctate Globalmente',
        'contact.subtitle': '¿Listo para llevar tu proyecto al siguiente nivel? Creemos algo extraordinario juntos.',
        'contact.email.title': 'Email',
        'contact.phone.title': 'Teléfono',
        'contact.location.title': 'Ubicación',
        'contact.location.mozambique': 'Maputo, Mozambique',
        'contact.location.remote': 'Trabajo remoto y presencial dentro del país',
        'contact.social.title': 'Conéctate',
        'contact.form.name': 'Nombre Completo *',
        'contact.form.email': 'Email *',
        'contact.form.company': 'Empresa / Proyecto',
        'contact.form.project': 'Mensaje *',
        'contact.form.submit': 'Enviar Mensaje',
        'footer.mission': `Arquitecto de soluciones digitales globales, especializado en crear sistemas sofisticados que impulsan negocios internacionales y conectan culturas a través de la tecnología.`,
        'footer.available': 'Disponibilidad',
        'footer.timezone': 'Siempre que disponible',
        'footer.response': 'Respuesta',
        'footer.hours': '24-48 horas',
        'footer.modality': 'Modalidad',
        'footer.remote': 'Remoto / Presencial',
        'footer.rights': 'Todos los derechos reservados.'
    }
};


function changeLanguage(lang) {
    document.documentElement.className = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update all translatable elements
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Initialize with Portuguese
changeLanguage('pt');
