document.addEventListener('DOMContentLoaded', function() {
    // Знаходимо кнопку для копіювання
    const copyButton = document.querySelector('.Btn');
    const linkToCopy = document.querySelector('.LinkToCopy').textContent;

    // Додаємо обробник події для копіювання
    copyButton.addEventListener('click', function() {
        // Копіюємо текст в буфер обміну
        navigator.clipboard.writeText(linkToCopy).then(function() {
            alert('Посилання скопійовано в буфер обміну!');
        }).catch(function(err) {
            console.error('Помилка при копіюванні: ', err);
        });
    });
});