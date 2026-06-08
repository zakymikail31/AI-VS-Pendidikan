// ─── INTERSECTION OBSERVER FOR REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ─── TOGGLE DEBATE SIDES ───
let showingAI = false;

function switchSide() {
    showingAI = !showingAI;
    const track = document.getElementById('toggleTrack');
    const labelAI = document.getElementById('labelAI');
    const labelEdu = document.getElementById('labelEdu');
    const colEdu = document.getElementById('colEdu');
    const colAI = document.getElementById('colAI');

    if (showingAI) {
        track.classList.add('pro-ai');
        track.setAttribute('aria-checked', 'true');
        labelAI.classList.remove('inactive'); labelAI.classList.add('active');
        labelEdu.classList.remove('active'); labelEdu.classList.add('inactive');
        // Dim edu cards, highlight AI cards
        colEdu.querySelectorAll('.arg-card').forEach(c => {
            c.classList.add('dimmed'); c.classList.remove('highlighted');
        });
        colAI.querySelectorAll('.arg-card').forEach(c => {
            c.classList.remove('dimmed'); c.classList.add('highlighted');
        });
    } else {
        track.classList.remove('pro-ai');
        track.setAttribute('aria-checked', 'false');
        labelEdu.classList.remove('inactive'); labelEdu.classList.add('active');
        labelAI.classList.remove('active'); labelAI.classList.add('inactive');
        colAI.querySelectorAll('.arg-card').forEach(c => {
            c.classList.add('dimmed'); c.classList.remove('highlighted');
        });
        colEdu.querySelectorAll('.arg-card').forEach(c => {
            c.classList.remove('dimmed'); c.classList.add('highlighted');
        });
    }
}

// Keyboard support for toggle
document.getElementById('toggleTrack').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchSide(); }
});

// Initially: AI side is highlighted
switchSide();

// ─── PARALLAX ON HERO BG TEXT ───
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (bgText) {
        bgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.25}px))`;
    }
}, { passive: true });