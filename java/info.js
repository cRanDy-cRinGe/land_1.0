const toggleButton = document.getElementById('toggleButton');
const popup = document.getElementById('popup');

toggleButton.addEventListener('click', () => {
    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        popup.classList.add('visible');
    } else {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }
});