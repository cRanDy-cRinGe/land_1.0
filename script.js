document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.filter');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var popup = document.querySelector('.popup');
            popup.classList.toggle('hidden');
        });
    });
});