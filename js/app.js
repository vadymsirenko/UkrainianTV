window.addEventListener('load', () => {

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('./serviceworker.js')
            .then(registration => {
                if (registration.waiting) {
                    // оброботчик SW в ожидании
                    askUserToUpdate(registration);
                }
                console.log('Service worker successfully registered', registration);
            })
            .catch(error => {
                console.log('Service worker registration failed', error);
            });
    }
});