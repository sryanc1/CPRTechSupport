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

    // Scroll-based Scene Animation System
    const svg = document.getElementById('animatedSvg');
    const sections = document.querySelectorAll('.text-column section');
    const scenes = {
        scene1: document.getElementById('scene1'),
        scene2: document.getElementById('scene2'),
        scene3: document.getElementById('scene3'),
        scene4: document.getElementById('scene4'),
        scene5: document.getElementById('scene5'),
        scene6: document.getElementById('scene6')
    };

    // Scene-specific elements
    const peripherals = document.getElementById('peripherals');
    const users = document.getElementById('users');

    let currentScene = 1;

    function updateScenes() {
        // Get scroll position
        const scrollY = window.scrollY;
        const contentWrapper = document.querySelector('.content-wrapper');
        const contentTop = contentWrapper.offsetTop;
        const relativeScroll = scrollY - contentTop;

        // Determine which section is in view
        let activeSection = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                activeSection = index;
            }
        });

        // Map sections to scenes (adjust based on your section IDs)
        const sectionToScene = {
            0: 1, // services
            1: 1, // about (still showing devices)
            2: 2, // Devices
            3: 3, // Networking
            4: 4, // Servers
            5: 5, // Security
            6: 6  // Cloud + Whole
        };

        const targetScene = sectionToScene[activeSection] || 1;

        // Only update if scene changed
        if (targetScene !== currentScene) {
            currentScene = targetScene;
            updateSceneVisibility(currentScene);
        }

        // Calculate zoom based on scene progression
        const zoomLevels = {
            1: 1.5,    // Close-up on laptop
            2: 1.2,    // Zoom out a bit for router
            3: 1.0,    // Medium view for server
            4: 0.85,   // Wider for security
            5: 0.7,    // Even wider for cloud
            6: 0.6     // Full network view
        };

        const targetZoom = zoomLevels[currentScene] || 1;
        svg.style.transform = `scale(${targetZoom})`;

        // Scene-specific animations
        animateCurrentScene(currentScene, relativeScroll);
    }

    function updateSceneVisibility(sceneNumber) {
        // Fade out all scenes
        Object.keys(scenes).forEach(key => {
            scenes[key].style.opacity = '0';
        });

        // Fade in active scene and previous scenes (for layering effect)
        for (let i = 1; i <= sceneNumber; i++) {
            const scene = scenes[`scene${i}`];
            if (scene) {
                scene.style.opacity = '1';
            }
        }
    }

    function animateCurrentScene(sceneNumber, scrollPos) {
        const progress = (scrollPos % 500) / 500; // Progress within current section

        switch(sceneNumber) {
            case 1:
                // Fade in peripherals
                if (peripherals) {
                    peripherals.style.opacity = Math.min(1, progress * 2);
                }
                break;

            case 2:
                // Data dots already animated via SVG animateMotion
                break;

            case 3:
                // Fade in users
                if (users) {
                    users.style.opacity = Math.min(1, progress * 2);
                }
                break;

            case 4:
                // Shield and threats already animated
                break;

            case 5:
                // Cloud breathing already via CSS
                break;

            case 6:
                // Everything pulses in harmony
                break;
        }
    }

    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateScenes);
    });

    // Initial scene setup
    updateScenes();
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

