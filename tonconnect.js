document.addEventListener('DOMContentLoaded', function () {
            const tonConnect = new TonConnect({
                manifestUrl: 'https://your-github-username.github.io/your-github-repo/tonconnect-manifest.json'
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
