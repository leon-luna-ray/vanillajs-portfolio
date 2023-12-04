const html = document.querySelector('html');
const darkModeBtn = document.getElementById('dark-mode-btn');
const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');

const toggleDarkMode = () => {
  html.classList.toggle('dark');
};

const handleDarkModeChange = (e) => {
  const isDarkMode = html.classList.contains('dark');

  if ((isDarkMode && !e.matches) || (!isDarkMode && e.matches)) {
    toggleDarkMode();
  }
};

darkPreference.addEventListener('change', handleDarkModeChange);

darkModeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleDarkMode();
});

handleDarkModeChange(darkPreference);
