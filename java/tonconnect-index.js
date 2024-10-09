let tonweb, counter, counterAddress, counterValue;

document.addEventListener("DOMContentLoaded", function () {
    window.TonAccess.getHttpEndpoint({ network: "mainnet" })
        .then(async (endpoint) => {
            tonweb = new window.TonWeb(new window.TonWeb.HttpProvider(endpoint));

            counter = new Counter(tonweb.provider);
            counterAddress = await counter.getAddress();
            // counterValue = await counter.getCounter();

            console.log(counterAddress.toString(true, true, true));
        })
        .catch((error) => console.error(error));
});

// Ініціалізація TonConnect UI
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://crandy-cringe.github.io/land_1.0/tonconnect-manifest.json',
    buttonRootId: 'btn'
});

// Після підключення отримуємо адресу гаманця
tonConnectUI.onStatusChange((wallet) => {
    if (wallet && wallet.account) {
        localStorage.setItem('walletAddress', wallet.account.address); // зберігаємо адресу
        console.log('Wallet connected:', wallet.account.address);
    }
});

// Перенаправлення на сторінку гаманця при натисканні кнопки
document.getElementById('button').addEventListener('click', () => {
    window.location.href = 'wallet.html';
});
