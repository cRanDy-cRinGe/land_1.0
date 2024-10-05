document.addEventListener('DOMContentLoaded', function () {
    console.log('Перевірка доступності TonConnect:', typeof TonConnect);

    if (typeof TonConnect === 'undefined') {
        console.error('TonConnect SDK не завантажено');
        return;
    }

    const tonConnect = new TonConnect({
        manifestUrl: 'https://crandy-cringe.github.io/land_1.0/tonconnect-manifest.json'
    });

    document.getElementById('btn').addEventListener('click', async () => {
        try {
            const wallets = await tonConnect.getWallets();
            console.log('Доступні гаманці:', wallets);

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
