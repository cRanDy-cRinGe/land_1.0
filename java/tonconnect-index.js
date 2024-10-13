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

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://crandy-cringe.github.io/land_1.0/tonconnect-manifest.json',
    buttonRootId: 'btn'
});

// Після підключення отримуємо адресу гаманця
tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet && wallet.account) {
        const walletAddress = wallet.account.address;
        localStorage.setItem('walletAddress', walletAddress);

        // TON BALANCE
        await updateTonBalance(walletAddress);

        const hasNFT = await checkNFT(walletAddress);
        if (hasNFT) {
            enableMining();
        } else {
            disableMining();
        }
    } else {
        console.error('Wallet not connected');
    }
});
async function updateTonBalance(walletAddress) {
    const apiUrl = `https://toncenter.com/api/v2/getAddressBalance?address=${walletAddress}`; // URL до API для отримання балансу

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Баланс зберігається в data.result в наносекундах
        const balanceInNano = data.result;
        const balanceInTon = balanceInNano / Math.pow(10, 9); // Конвертуємо в TON

        // Виводимо баланс в елемент з ID ton-balance
        document.getElementById('ton-balance').innerText = `${balanceInTon.toFixed(4)}`;
    } catch (error) {
        console.error('Error fetching balance:', error);
        document.getElementById('ton-balance').innerText = 'Error fetching balance';
    }
}
// Функція для перевірки NFT
async function checkNFT(walletAddress) {
    const collectionAddress = '0:9C2BAB818D0BC02E7C78B61E4C7EA7224130CD52D313E2F1957538626C0308A7'; // Правильна адреса колекції
    const apiUrl = `https://toncenter.com/api/v3/nft/items?owner_address=${walletAddress}&collection_address=${collectionAddress}&limit=10&offset=0`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Виводимо результат для перевірки

        // Перевіряємо, чи є NFT в результаті
        if (data.nft_items && data.nft_items.length > 0) {
            console.log('Wallet has a nft');
            return true; // NFT знайдено
        } else {
            console.log('No NFT found in the wallet.');
            return false; // NFT не знайдено
        }
    } catch (error) {
        console.error('Error fetching NFT data:', error);
        return false; // Повертає false у випадку помилки
    }
}

function enableMining() {
    let currentValue = 0;
    let step = 0.0000002222; // Крок зміни значення за мілісекунду
    let intervalId;
    let elapsedTime = 0; // Час, що минув в мілісекундах
    const totalDuration = 3600000; // Одна година в мілісекундах

    document.getElementById('button-mine-tcl').addEventListener('click', () => {
        if (!intervalId) {
            intervalId = setInterval(() => {
                elapsedTime += 1; // Збільшуємо час на 1 мілісекунду

                // Додаємо крок до поточного значення
                currentValue += step;

                // Оновлюємо текст на сторінці
                document.getElementById('mine-tcl').innerText = `TEA Hashrate: ${currentValue.toFixed(5)} TCL/min`;

                // Зупиняємо лічильник після однієї години
                if (elapsedTime >= totalDuration) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }, 1); // Оновлюємо кожну мілісекунду
        }
    });
}

function disableMining() {
    document.getElementById('button-mine-tcl').addEventListener('click', () => {
        alert('Спершу потрібно купити NFT');
    });
}

// Перенаправлення на сторінку гаманця при натисканні кнопки
document.getElementById('button').addEventListener('click', () => {
    window.location.href = 'wallet.html';
});
document.getElementById('button-bot-shop').addEventListener('click', () => {
    window.location.href = 'shop.html';
});
document.getElementById('button-bot-earn').addEventListener('click', () => {
    window.location.href = 'earn.html';
});
document.getElementById('button-bot-ref').addEventListener('click', () => {
    window.location.href = 'referals.html';
});
document.getElementById('button-bot-nft').addEventListener('click', () => {
    window.location.href = 'nfts.html';
});
