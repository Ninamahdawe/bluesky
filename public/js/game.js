const playButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        document.location.replace('/play');
    }
};

document
    .getElementById('btn-play')
    .addEventListener('click', playButtonHandler);
