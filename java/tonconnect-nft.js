const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://crandy-cringe.github.io/land_1.0/tonconnect-manifest.json',
});
const walletAddress = localStorage.getItem('walletAddress');

// Перевірка наявності адреси у localStorage
if (walletAddress) {
    document.getElementById('walletAddress').innerText = `Wallet Address: ${walletAddress}`;
} else {
    document.getElementById('walletAddress').innerText = 'Wallet not connected';
}


// Функція для відправки транзакції
document.getElementById('buy-button-2').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "500000000" // Сума у нанотонах (100000000 = 0.1 TON)
                }
            ]
        };

        try {
            await tonConnectUI.sendTransaction(transaction); // Відправляємо транзакцію через TonConnectUI
            alert('Transaction sent successfully');
        } catch (e) {
            console.error('Transaction failed:', e);
            alert('Transaction failed');
        }
    } else {
        alert('Wallet not connected');
    }
});
document.getElementById('buy-button-2-1').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "1000000000" // Сума у нанотонах (100000000 = 0.1 TON)
                }
            ]
        };

        try {
            await tonConnectUI.sendTransaction(transaction); // Відправляємо транзакцію через TonConnectUI
            alert('Transaction sent successfully');
        } catch (e) {
            console.error('Transaction failed:', e);
            alert('Transaction failed');
        }
    } else {
        alert('Wallet not connected');
    }
});
document.getElementById('buy-button-3').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "5000000000" // Сума у нанотонах (100000000 = 0.1 TON)
                }
            ]
        };

        try {
            await tonConnectUI.sendTransaction(transaction); // Відправляємо транзакцію через TonConnectUI
            alert('Transaction sent successfully');
        } catch (e) {
            console.error('Transaction failed:', e);
            alert('Transaction failed');
        }
    } else {
        alert('Wallet not connected');
    }
});
document.getElementById('buy-button-3-1').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "10000000000" // Сума у нанотонах (100000000 = 0.1 TON)
                }
            ]
        };

        try {
            await tonConnectUI.sendTransaction(transaction); // Відправляємо транзакцію через TonConnectUI
            alert('Transaction sent successfully');
        } catch (e) {
            console.error('Transaction failed:', e);
            alert('Transaction failed');
        }
    } else {
        alert('Wallet not connected');
    }
});
document.getElementById('buy-button-4').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "25000000000" // Сума у нанотонах (100000000 = 0.1 TON)
                }
            ]
        };

        try {
            await tonConnectUI.sendTransaction(transaction); // Відправляємо транзакцію через TonConnectUI
            alert('Transaction sent successfully');
        } catch (e) {
            console.error('Transaction failed:', e);
            alert('Transaction failed');
        }
    } else {
        alert('Wallet not connected');
    }
});
document.getElementById('buy-button-4-1').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "50000000000" // Сума у нанотонах (100000000 = 0.1 TON)
                }
            ]
        };

        try {
            await tonConnectUI.sendTransaction(transaction); // Відправляємо транзакцію через TonConnectUI
            alert('Transaction sent successfully');
        } catch (e) {
            console.error('Transaction failed:', e);
            alert('Transaction failed');
        }
    } else {
        alert('Wallet not connected');
    }
});
