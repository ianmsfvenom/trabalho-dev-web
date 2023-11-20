document.addEventListener('DOMContentLoaded', async event => {
    const cards = document.querySelectorAll(".card");

    function fadeInAndMoveCard(card) {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fadeInAndMoveCard(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    cards.forEach(card => {
        observer.observe(card);
    });
})

document.getElementById('logout-btn').addEventListener('click', async event => {
    document.cookie = 'auth-token=;'
    window.location.href = '/login'
})