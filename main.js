document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    // Toggle navigation
    navToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Close nav when clicking links on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768 &&
            !sidebar.contains(event.target) &&
            !navToggle.contains(event.target) &&
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Scroll-based SVG Animation
    const svg = document.getElementById('animatedSvg');
    const server = document.getElementById('server');
    const network = document.getElementById('network');
    const cloud = document.getElementById('cloud');
    const dataFlow = document.getElementById('dataFlow');

    window.addEventListener('scroll', function() {
        // Get scroll position relative to content wrapper
        const contentWrapper = document.querySelector('.content-wrapper');
        const rect = contentWrapper.getBoundingClientRect();

        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

        // Rotate server based on scroll
        const serverRotation = scrollProgress * 360;
        server.style.transform = `rotate(${serverRotation}deg)`;
        server.style.transformOrigin = 'center';

        // Scale network connections
        const networkScale = 0.5 + (scrollProgress * 0.5);
        network.style.transform = `scale(${networkScale})`;
        network.style.transformOrigin = 'center';

        // Translate cloud up and down
        const cloudTranslate = Math.sin(scrollProgress * Math.PI * 2) * 20;
        cloud.style.transform = `translateY(${cloudTranslate}px)`;

        // Animate data flow opacity
        const dataOpacity = 0.3 + (Math.sin(scrollProgress * Math.PI * 4) * 0.7);
        dataFlow.style.opacity = dataOpacity;
    });
});

function toggleNav() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function closeNav() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
    }
}

