window.addEventListener('load', () => {
    // виклик модального вікна
    const askUserToUpdate = reg => {
        return Modal.confirm({
            onOk: async () => {
                // оборбляємо зміну стану
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    window.location.reload();
                });

                // пропускаємо очікування 
                if (reg && reg.waiting) {
                    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                }
            },

            onCancel: () => {
                Modal.destroyAll();
            },
            icon: null,
            title: 'Гарні новини!!!',
            content:
                'Программа вдосконалюється! Якщо ви бажаєте оновити її, натисніть кнопку нижче',
            cancelText: 'Відкласти',
            okText: 'Оновити'
        });
    };

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('./serviceworker.js')
            .then(registration => {
                if (registration.waiting) {
                    // обробник SW в очікуванні
                    askUserToUpdate(registration);
                }
                console.log('Service worker successfully registered', registration);
            })
            .catch(error => {
                console.log('Service worker registration failed', error);
            });
    }
});