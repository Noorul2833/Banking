const users = {
    'Noorul': { balance: 500, transactions: [] },
    'Praveen': { balance: 300, transactions: [] },
    'Aadith': { balance: 1000, transactions: []},
};

let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    if (users[username]) {
        currentUser = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user').textContent = username;
        updateDashboard();
    } else {
        alert('User not found');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('login').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('username').value = '';
}

function updateDashboard() {
    if (currentUser) {
        document.getElementById('balance').textContent = users[currentUser].balance;
        const transactionsList = document.getElementById('transactions');
        transactionsList.innerHTML = '';
        users[currentUser].transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = transaction;
            transactionsList.appendChild(listItem);
        });
    }
}

function transfer() {
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (users[recipient] && amount > 0 && amount <= users[currentUser].balance) {
        users[currentUser].balance -= amount;
        users[recipient].balance += amount;

        const transaction = `Sent Rs.${amount} to ${recipient}`;
        users[currentUser].transactions.push(transaction);
        users[recipient].transactions.push(`Received $${amount} from ${currentUser}`);

        updateDashboard();
    } else {
        alert('Invalid transaction');
    }
}
