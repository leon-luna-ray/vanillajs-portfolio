const html = document.querySelector('html');
const darkModeBtn = document.getElementById('dark-mode-btn');
const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');
const isDarkMode = html.classList.contains('dark');

// Methods
const toggleDarkMode = () => {
  html.classList.toggle('dark');
};
const handleDarkModeChange = () => {
//   e.preventDefault();
  if ((!isDarkMode && darkPreference.matches) || (isDarkMode && !darkPreference.matches)) {
    toggleDarkMode();
  }
};

// Events
darkPreference.addEventListener('change', handleDarkModeChange);

darkModeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleDarkMode();
});

handleDarkModeChange();