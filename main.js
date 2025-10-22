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

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
      const sidebar = document.getElementById('sidebar');
      const toggle = document.querySelector('.nav-toggle');
      
      if (window.innerWidth < 768 && 
          !sidebar.contains(event.target) && 
          !toggle.contains(event.target) &&
          sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
      }
  });
