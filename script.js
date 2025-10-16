/* ========================================= */
/* ====== EFEITO FADE-IN AO ROLAR ====== */
/* ========================================= */

// 1. Seleciona todos os elementos que queremos animar
const sectionsToAnimate = document.querySelectorAll('section');

// 2. Cria o "observador"
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Se o elemento está visível na tela
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // A animação começa quando 10% do elemento está visível
});

// 3. Diz ao observador para "observar" cada uma das nossas seções
sectionsToAnimate.forEach(section => {
    observer.observe(section);
});


// Adiciona o estilo inicial para a animação no CSS
const style = document.createElement('style');
style.innerHTML = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);


/* ========================================= */
/* ========= LÓGICA PARA O CARROSSEL ========= */
/* ========================================= */

// Aguarda o DOM carregar para evitar erros
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos do carrossel
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Verifica se o carrossel existe na página antes de rodar o código
    if (!slidesContainer) return;

    let currentSlide = 0;
    let slideInterval;

    // Cria as bolinhas de navegação
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval(); // Reinicia o timer ao clicar na bolinha
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Função principal para mostrar o slide
    const goToSlide = (slideIndex) => {
        // Lógica para loop infinito
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        // Move o container de slides
        slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;

        // Atualiza a bolinha ativa
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    };

    // Função para o próximo slide
    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    };
    
    // Função para o slide anterior
    const prevSlide = () => {
        goToSlide(currentSlide - 1);
    };

    // Adiciona os eventos aos botões
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval(); // Reinicia o timer ao clicar
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval(); // Reinicia o timer ao clicar
    });
    
    // Função para troca automática de slides
    const startInterval = () => {
        slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    };

    // Função para reiniciar o intervalo
    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Inicia a troca automática
    startInterval();
});