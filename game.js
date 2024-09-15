// Initial Game Setup
let coinBalance = localStorage.getItem('coinBalance') || 100;
let freeSpinsRemaining = 0;
let currentGameMode = 'base'; // Can be 'base', 'bonus', or 'free-spin'
const reelSymbols = ['$', '7', '*']; // Symbols for the slot machine reels

// Update coin balance display
document.getElementById('coin-balance').innerText = coinBalance;

const spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', spinReels);

document.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', handleChoice);
});

function spinReels() {
    // Disable spin button during spins
    spinButton.disabled = true;

    // Check if player has enough coins
    if (coinBalance <= 0) {
        document.getElementById('status-text').innerText = "Out of coins!";
        spinButton.disabled = false;
        return;
    }

    if (freeSpinsRemaining > 0) {
        document.getElementById('status-text').innerText = `Free spins remaining: ${freeSpinsRemaining}`;
        freeSpinsRemaining--;
    } else {
        coinBalance--;
        updateCoinBalance();
    }

    // Generate random symbols for the 9 reels
    const reels = [];
    for (let i = 1; i <= 9; i++) {
        const symbol = getRandomSymbol();
        reels.push(symbol);
        document.getElementById(`reel-${i}`).innerText = symbol;
        document.getElementById(`reel-${i}`).setAttribute('data-symbol', symbol); // Change color
    }

    // Check if the player won
    checkWin(reels);

    // Trigger question system
    if (currentGameMode === 'base' && Math.random() < 0.2) { // 20% chance for question
        showQuestion();
    } else {
        spinButton.disabled = false;
    }
}

function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * reelSymbols.length);
    return reelSymbols[randomIndex];
}

function checkWin(reels) {
    // Simplified winning condition: Any 3 matching symbols in the grid
    const winningSymbol = reels[0]; // Assume first symbol for this example
    const allMatch = reels.every(symbol => symbol === winningSymbol);

    if (allMatch) {
        let winAmount = 10;
        if (winningSymbol === '$') {
            winAmount = 30;
        } else if (winningSymbol === '7') {
            winAmount = 50;
        } else if (winningSymbol === '*') {
            winAmount = 20;
        }

        document.getElementById('status-text').innerText = `You won ${winAmount} coins!`;
        coinBalance += winAmount;
        updateCoinBalance();
    } else {
        document.getElementById('status-text').innerText = "Try Again!";
    }

    spinButton.disabled = false;
}

function updateCoinBalance() {
    document.getElementById('coin-balance').innerText = coinBalance;
    localStorage.setItem('coinBalance', coinBalance);
}

function showQuestion() {
    document.getElementById('question-section').style.display = 'block';
}

function handleChoice(event) {
    const choice = event.target.getAttribute('data-choice');
    document.getElementById('question-section').style.display = 'none';

    if (choice == '1') {
        // Ask for Guidance
        document.getElementById('status-text').innerText = "The mysterious figure gave you a hint. You earn 5
// Initial Game Setup
let coinBalance = localStorage.getItem('coinBalance') || 100;
let freeSpinsRemaining = 0;
let currentGameMode = 'base'; // Can be 'base', 'bonus', or 'free-spin'
const reelSymbols = ['$', '7', '*']; // Symbols for the slot machine reels
const questions = [
    {
        text: "You have to reach Murlan, what path do you choose?",
        choices: [
            { text: "Follow the Path", value: 9 },
            { text: "Up the Mountain", value: 18 },
            { text: "Through the Woods", value: 36 }
        ]
    },
    {
        text: "You encounter a magical creature, what do you do?",
        choices: [
            { text: "Pet the Creature", value: 10 },
            { text: "Run Away", value: 5 },
            { text: "Ask for Help", value: 20 }
        ]
    }
];

// Update coin balance display
document.getElementById('coin-balance').innerText = coinBalance;

const spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', spinReels);

function spinReels() {
    // Disable spin button during spins
    spinButton.disabled = true;

    // Check if player has enough coins
    if (coinBalance <= 0) {
        document.getElementById('status-text').innerText = "Out of coins!";
        spinButton.disabled = false;
        return;
    }

    if (freeSpinsRemaining > 0) {
        document.getElementById('status-text').innerText = `Free spins remaining: ${freeSpinsRemaining}`;
        freeSpinsRemaining--;
    } else {
        coinBalance--;
        updateCoinBalance();
    }

    // Generate random symbols for the 9 reels
    const reels = [];
    for (let i = 1; i <= 9; i++) {
        const symbol = getRandomSymbol();
        reels.push(symbol);
        const reel = document.getElementById(`reel-${i}`);
        reel.innerText = symbol;
        reel.setAttribute('data-symbol', symbol); // Change color
    }

    // Check if the player won
    checkWin(reels);

    // Trigger question system
    if (currentGameMode === 'base' && Math
