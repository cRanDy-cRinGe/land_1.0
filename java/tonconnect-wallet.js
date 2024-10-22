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
tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet && wallet.account) {
        const walletAddress = wallet.account.address;
        localStorage.setItem('walletAddress', walletAddress);

        // Отримуємо баланс TON з TON API
        await updateTonBalance(walletAddress);

        // Оновлюємо баланс TCL
        await getBalance(walletAddress); // Оновлюємо баланс після підключення
    } else {
        console.error('Wallet not connected');
    }
});
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

        document.getElementById('ton-balance').innerText = `${balanceInTon.toFixed(3)} TON`;
    } catch (error) {
        console.error('Error fetching balance:', error);
        document.getElementById('ton-balance').innerText = 'Error fetching balance';
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
            document.getElementById('tcl-balance').innerText = `${balance.toFixed(4)} TCL`;
        } else {
            console.error('Error fetching balance:', data.error);
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}
// Функція для відправки транзакції
document.getElementById('send').addEventListener('click', async () => {
    if (walletAddress) {
        const transaction = {
            validUntil: Math.round(Date.now() / 1000) + 10, // Встановлюємо час дії транзакції
            messages: [
                {
                    address: "UQCwKTKDsUO8H98OEMCO-8jYGSghMHT_26IcIcnGzqabgl7C", // Адреса отримувача
                    amount: "100000000" // Сума у нанотонах (100000000 = 0.1 TON)
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
