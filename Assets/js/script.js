document.getElementById("menu_icon").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("active");
  document.getElementById("menu_close").classList.toggle("active");
  document.getElementById("burger_menu").classList.toggle("out");
  document.getElementById("icon").classList.toggle("out");
});


 const toggleBtn = document.getElementById('darkModeToggle');

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });