// Efeito de Fade-in suave ao rolar a página

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
