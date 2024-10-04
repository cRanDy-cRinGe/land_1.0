document.addEventListener('DOMContentLoaded', function () {
    // Лог для перевірки доступності TonConnect
    console.log('Перевірка доступності TonConnect:', typeof TonConnect); // Лог для перевірки доступності

    // Перевірка доступності TonConnect
    if (typeof TonConnect === 'undefined') {
        console.error('TonConnect SDK не завантажено');
        return; // Вихід, якщо SDK не завантажено
    }

    // Ініціалізація TonConnect
    const tonConnect = new TonConnect({ 
        manifestUrl: 'https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest/dist/tonconnect-sdk.min.js' 
    });

    // Обробник події для кнопки підключення
    document.getElementById('btn').addEventListener('click', async () => {
        try {
            const wallets = await tonConnect.getWallets();
            const tonkeeper = wallets.find(wallet => wallet.name === 'Tonkeeper');

            if (!tonkeeper) {
                throw new Error('Tonkeeper не знайдено серед доступних гаманців');
            }

            await tonConnect.connectWallet({
                universalLink: tonkeeper.universalLink,
                bridgeUrl: tonkeeper.bridgeUrl,
            });

            if (tonConnect.wallet) {
                const userInfo = tonConnect.wallet.account;
                console.log('Підключено до Tonkeeper:', userInfo);
            } else {
                console.error('Підключення не вдалося');
            }
        } catch (error) {
            console.error('Помилка підключення:', error.message);
        }
    });
});
