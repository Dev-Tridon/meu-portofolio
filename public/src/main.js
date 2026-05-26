   // ========== SPA ROUTER COM TRANSIÇÕES SUAVES ==========

        // Configurações
        let currentPage = 'home';
        let isTransitioning = false;

        // Elementos
        const pages = document.querySelectorAll('.page');
        const navLinks = document.querySelectorAll('.nav-link');
        const overlay = document.getElementById('pageTransitionOverlay');

        // Configurações de SEO para cada página
        const seoConfig = {
            home: {
                title: 'Tridon José Acácio | Full Stack Developer - React, Electron, Java',
                description: 'Desenvolvedor Full Stack especialista em React, Electron, Java Spring Boot e arquitetura multi-tenant. Criador do GSInfo para restaurantes e piscinas.',
                keywords: 'Tridon José, desenvolvedor full stack, React, Electron, Java, Spring Boot, multi-tenant',
                ogTitle: 'Tridon José Acácio | Full Stack Developer',
                ogDescription: 'Portfólio profissional - Especialista em React, Electron e arquitetura multi-tenant'
            },
            projects: {
                title: 'Projetos GSInfo | Tridon José Acácio - Portfólio de Desenvolvimento',
                description: 'Conheça os projetos GSInfo: aplicação desktop com Electron, PWA com React+Vite, e backend multi-tenant com Spring Boot e Node.js.',
                keywords: 'GSInfo, projetos React, Electron desktop, PWA restaurante, multi-tenant Spring Boot',
                ogTitle: 'Projetos | Tridon José Acácio - GSInfo',
                ogDescription: 'Portfólio de projetos: Electron, React+Vite PWA, Backend Multi-tenant'
            },
            expertise: {
                title: 'Tech Stack | Tridon José Acácio - Tecnologias e Ferramentas',
                description: 'Tecnologias dominadas: React, Electron, Vite, Java Spring Boot, Node.js, PostgreSQL, Docker, arquitetura multi-tenant e muito mais.',
                keywords: 'React, Electron, Vite, Java Spring Boot, Node.js, multi-tenant, Docker, PostgreSQL',
                ogTitle: 'Tech Stack | Tridon José Acácio',
                ogDescription: 'Full Stack Developer - React, Electron, Java, Node.js, Multi-tenant'
            },
            contact: {
                title: 'Contato | Tridon José Acácio - Vamos Trabalhar Juntos',
                description: 'Entre em contato para projetos, parcerias ou oportunidades de trabalho. Disponível para remoto e presencial em Moçambique.',
                keywords: 'contato desenvolvedor, contratar full stack, React developer, Java developer Moçambique',
                ogTitle: 'Contato | Tridon José Acácio',
                ogDescription: 'Disponível para projetos - Vamos criar algo extraordinário juntos'
            }
        };

        // Função para atualizar SEO
        function updateSEO(pageId) {
            const config = seoConfig[pageId];
            if (!config) return;

            // Atualizar title
            document.title = config.title;
            document.getElementById('metaTitle')?.setAttribute('content', config.title);

            // Atualizar meta description
            document.getElementById('metaDescription')?.setAttribute('content', config.description);

            // Atualizar meta keywords
            document.getElementById('metaKeywords')?.setAttribute('content', config.keywords);

            // Atualizar Open Graph
            document.getElementById('ogTitle')?.setAttribute('content', config.ogTitle);
            document.getElementById('ogDescription')?.setAttribute('content', config.ogDescription);
            document.getElementById('ogUrl')?.setAttribute('content', `https://tridonjose.com/#${pageId}`);

            // Atualizar Twitter Card
            document.getElementById('twitterTitle')?.setAttribute('content', config.ogTitle);
            document.getElementById('twitterDescription')?.setAttribute('content', config.ogDescription);

            // Atualizar Canonical
            document.getElementById('canonicalUrl')?.setAttribute('href', `https://tridonjose.com/#${pageId}`);
        }

        // Função principal de navegação com transição suave
        async function navigateTo(pageId) {
            if (isTransitioning || currentPage === pageId) return;
            isTransitioning = true;

            // Mostrar overlay de transição
            if (overlay) overlay.classList.add('active');

            // Animação de saída da página atual
            const currentPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
            if (currentPageElement) {
                currentPageElement.classList.add('exit');
                await new Promise(r => setTimeout(r, 200));
                currentPageElement.classList.remove('active', 'exit');
            }

            // Mostrar nova página com animação de entrada
            const newPageElement = document.querySelector(`.page[data-page="${pageId}"]`);
            if (newPageElement) {
                newPageElement.classList.add('active');
                // Scroll suave para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Atualizar URL sem recarregar
            history.pushState({ page: pageId }, '', `#${pageId}`);

            // Atualizar classe active nos links de navegação
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('data-page');
                if (linkPage === pageId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Atualizar SEO
            updateSEO(pageId);

            // Atualizar página atual
            currentPage = pageId;

            // Re-inicializar AOS para animações da nova página
            setTimeout(() => {
                AOS.refresh();
            }, 100);

            // Esconder overlay
            setTimeout(() => {
                if (overlay) overlay.classList.remove('active');
                isTransitioning = false;
            }, 300);
        }

        // Event listeners para navegação
        document.querySelectorAll('[data-navigate], .nav-link, .nav-cta').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const page = el.getAttribute('data-page') || el.getAttribute('data-navigate');
                if (page && ['home', 'projects', 'expertise', 'contact'].includes(page)) {
                    navigateTo(page);
                }
            });
        });

        // Lidar com navegação do browser (botão voltar/avançar)
        window.addEventListener('popstate', (event) => {
            const hash = window.location.hash.replace('#', '');
            const page = hash && ['home', 'projects', 'expertise', 'contact'].includes(hash) ? hash : 'home';
            navigateTo(page);
        });

        // Inicializar com base na URL
        const initialHash = window.location.hash.replace('#', '');
        const initialPage = (initialHash && ['home', 'projects', 'expertise', 'contact'].includes(initialHash)) ? initialHash : 'home';

        // Configurar página inicial
        const initialPageElement = document.querySelector(`.page[data-page="${initialPage}"]`);
        if (initialPageElement) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            initialPageElement.classList.add('active');
        }
        currentPage = initialPage;
        updateSEO(initialPage);

        // Atualizar classe active nos links
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === initialPage) {
                link.classList.add('active');
            }
        });

        // ========== ANIMAÇÕES e MENU MOBILE ==========

        // Inicializar AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinksContainer = document.getElementById('navLinks');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
                mobileMenuToggle.innerHTML = navLinksContainer.classList.contains('active')
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>';
            });
        }

        // Fechar menu mobile ao clicar em um link
        document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // ========== TRADUÇÃO ==========

        let currentLang = 'pt';

        function changeLanguage(lang) {
            if (!translations[lang]) return;

            currentLang = lang;
            document.documentElement.className = lang;

            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.trim().toUpperCase() === lang.toUpperCase()) {
                    btn.classList.add('active');
                }
            });

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

        // Form submit
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    const successMsg = currentLang === 'pt' ? ' Mensagem enviada com sucesso! Entrarei em contato em breve.' :
                        currentLang === 'en' ? ' Message sent successfully! I will contact you soon.' :
                            '¡Mensaje enviado con éxito! Te contactaré pronto.';
                    alert(successMsg);
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }

        // Inicializar tradução
        changeLanguage('pt');

        // Pré-carregar imagens da próxima página (otimização)
        const nextPages = ['projects', 'expertise', 'contact'];
        nextPages.forEach(page => {
            const pageElement = document.querySelector(`.page[data-page="${page}"]`);
            if (pageElement) {
                const images = pageElement.querySelectorAll('img');
                images.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && src !== '/public/img/perfil.jpg') {
                        const preloadLink = document.createElement('link');
                        preloadLink.rel = 'preload';
                        preloadLink.as = 'image';
                        preloadLink.href = src;
                        document.head.appendChild(preloadLink);
                    }
                });
            }
        });