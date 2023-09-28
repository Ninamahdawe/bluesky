const charButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        document.location.replace('/character');
    }
};

document
    .getElementById('btn-char')
    .addEventListener('click', charButtonHandler);
