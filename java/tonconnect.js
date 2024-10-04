// Підключаємо TonConnect через CDN
const tonConnect = new TonConnect({ manifestUrl: 'https://crandy-cringe.github.io/land_1.0/' });

// Встановлення обробника на кнопку для підключення
document.getElementById('btn').addEventListener('click', async () => {
    try {
        // Отримуємо список підтримуваних гаманців
        const wallets = await tonConnect.getWallets();

        // Фільтруємо список для Tonkeeper
        const tonkeeper = wallets.find(wallet => wallet.name === 'Tonkeeper');

        if (!tonkeeper) {
            throw new Error('Tonkeeper не знайдено серед доступних гаманців');
        }

        // Ініціюємо підключення
        await tonConnect.connectWallet({
            universalLink: tonkeeper.universalLink,
            bridgeUrl: tonkeeper.bridgeUrl,
        });

        // Перевірка підключеного гаманця
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