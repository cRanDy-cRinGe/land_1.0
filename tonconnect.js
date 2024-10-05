import TonConnect from '@tonconnect/sdk';

document.addEventListener('DOMContentLoaded', function () {
    const tonConnect = new TonConnect({
        manifestUrl: 'https://crandy-cringe.github.io/land_1.0/tonconnect-manifest.json'
    });

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

            const userInfo = tonConnect.wallet ? tonConnect.wallet.account : null;
            console.log('Підключено до Tonkeeper:', userInfo);
        } catch (error) {
            console.error('Помилка підключення:', error.message);
        }
    });
});
