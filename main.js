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

