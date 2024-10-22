let tonweb, counter, counterAddress, counterValue;

document.addEventListener("DOMContentLoaded", function () {
    window.TonAccess.getHttpEndpoint({ network: "mainnet" })
        .then(async (endpoint) => {
            tonweb = new window.TonWeb(new window.TonWeb.HttpProvider(endpoint));

            counter = new Counter(tonweb.provider);
            counterAddress = await counter.getAddress();
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

        // Отримуємо баланс TON з TON API
        await updateTonBalance(walletAddress);

        // Перевірка наявності NFT
        const hasNFT = await checkNFT(walletAddress);
        if (hasNFT) {
            enableMining(walletAddress); // Передаємо адресу гаманця у функцію майнінгу
        } else {
            disableMining();
        }

        // Оновлюємо баланс TCL
        await getBalance(walletAddress); // Оновлюємо баланс після підключення
    } else {
        console.error('Wallet not connected');
    }
});

async function checkUserExists(walletAddress) {
    try {
        const response = await fetch('http://localhost:3000/check-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress })
        });

        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
}

async function checkMiningSession(walletAddress) {
    try {
        const response = await fetch('http://localhost:3000/get-mining-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress })
        });
        const data = await response.json();
        if (data.active) {
            // Продовжуємо майнінг
            startMiningFromProgress(data.elapsedTime);
        }
    } catch (error) {
        console.error('Error fetching mining session:', error);
    }
}


// Отримуємо баланс TCL з бази даних
async function updateBalance(walletAddress, minedAmount) {
    try {
        const response = await fetch('http://localhost:3000/update-balance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress, minedAmount })
        });

        const data = await response.json();
        if (data.success) {
            console.log(`Balance updated successfully for ${walletAddress}. Mined Amount: ${minedAmount}`);
        } else {
            console.log('Failed to update balance');
        }
    } catch (error) {
        console.error('Error updating balance:', error);
    }
}
async function getBalance(walletAddress) {
    try {
        const response = await fetch('http://localhost:3000/get-balance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress })
        });

        const data = await response.json();
        console.log('Balance response:', data); // Лог для перевірки

        if (response.ok) {
            // Перетворюємо balance в число
            const balance = parseFloat(data.balance);
            document.getElementById('tcl-balance').innerText = `Balance: ${balance.toFixed(4)} TCL`;
        } else {
            console.error('Error fetching balance:', data.error);
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}



// Отримуємо баланс TON через API
async function updateTonBalance(walletAddress) {
    const apiUrl = `https://toncenter.com/api/v2/getAddressBalance?address=${walletAddress}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const balanceInNano = data.result;
        const balanceInTon = balanceInNano / Math.pow(10, 9);

        document.getElementById('ton-balance').innerText = `${balanceInTon.toFixed(3)}`;
    } catch (error) {
        console.error('Error fetching balance:', error);
        document.getElementById('ton-balance').innerText = 'Error fetching balance';
    }
}

// Функція для перевірки NFT
async function checkNFT(walletAddress) {
    const collectionAddress = '0:9C2BAB818D0BC02E7C78B61E4C7EA7224130CD52D313E2F1957538626C0308A7';
    const apiUrl = `https://toncenter.com/api/v3/nft/items?owner_address=${walletAddress}&collection_address=${collectionAddress}&limit=10&offset=0`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.nft_items && data.nft_items.length > 0;
    } catch (error) {
        console.error('Error fetching NFT data:', error);
        return false;
    }
}

async function enableMining(walletAddress) {
    let currentValue = 0;
    const step = 0.0001; // Значення для тестування
    let intervalId;
    let elapsedTime = 0;
    const totalDuration = 5000; // Для тестування 5 секунд

    document.getElementById('button-mine-tcl').addEventListener('click', () => {
        if (!intervalId) {
            intervalId = setInterval(() => {
                elapsedTime += 100; // Оновлюємо кожні 100 мс для тестування
                currentValue += step;

                document.getElementById('mine-tcl').innerText = `Mined: ${currentValue.toFixed(5)} TCL`;

                if (elapsedTime >= totalDuration) {
                    clearInterval(intervalId);
                    intervalId = null;

                    // Оновлюємо баланс після завершення майнінгу
                    updateBalance(walletAddress, currentValue).then(() => {
                        // Оновлюємо баланс на сторінці
                        getBalance(walletAddress); // Переконайтеся, що getBalance визначено до цього рядка
                    });
                    currentValue = 0;
                }
            }, 100); // Інтервал 100 мс
        }
    });
}



function disableMining() {
    document.getElementById('button-mine-tcl').addEventListener('click', () => {
        alert('Спершу потрібно купити NFT');
    });
}

// Перенаправлення на різні сторінки
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
