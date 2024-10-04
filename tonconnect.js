document.addEventListener('DOMContentLoaded', async function () {
    // Перевірка доступності TonConnect
    if (typeof TonConnect === 'undefined') {
        console.error('TonConnect SDK не завантажено');
        return;
    }
    
    console.log('TonConnect SDK завантажено:', TonConnect);

    // Ініціалізація TonConnect з URL маніфеста
    const tonConnect = new TonConnect({ 
        manifestUrl: 'https://crandy-cringe.github.io/land_1.0/tonconnect-manifest.json' 
    });

    // Обробник події для кнопки підключення
    document.getElementById('btn').addEventListener('click', async () => {
        try {
            // Отримання доступних гаманців
            const wallets = await tonConnect.getWallets();
            console.log('Доступні гаманці:', wallets);

            // Знаходження Tonkeeper серед доступних гаманців
            const tonkeeper = wallets.find(wallet => wallet.name === 'Tonkeeper');

            if (!tonkeeper) {
                throw new Error('Tonkeeper не знайдено серед доступних гаманців');
            }

            // Підключення до гаманця
            await tonConnect.connectWallet({
                universalLink: tonkeeper.universalLink,
                bridgeUrl: tonkeeper.bridgeUrl,
            });

            // Перевірка, чи підключено гаманця
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
