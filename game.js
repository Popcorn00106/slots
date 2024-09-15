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
        document.getElementById('status-text').innerText = "No win, try again!";
    }
}

function updateCoinBalance() {
    document.getElementById('coin-balance').innerText = coinBalance;
    localStorage.setItem('coinBalance', coinBalance);
}

function showQuestion() {
    document.getElementById('question-section').style.display = 'block';
    document.getElementById('spin-button').style.display = 'none';
}

function handleChoice(event) {
    const diceType = parseInt(event.target.getAttribute('data-choice'));
    document.getElementById('dice-type').innerText = diceType; // Display dice type
    rollDice(diceType);

    // Hide question section and show spin button again
    document.getElementById('question-section').style.display = 'none';
    document.getElementById('spin-button').style.display = 'block';

    spinButton.disabled = false;
}

function rollDice(diceSides) {
    let diceRolls = [];
    for (let i = 0; i < 9; i++) {
        diceRolls.push(Math.floor(Math.random() * diceSides) + 1);
    }

    document.getElementById('dice-roll').innerText = diceRolls.join(', ');
    checkDiceOutcome(diceRolls);
}

function checkDiceOutcome(diceRolls) {
    const winCondition = diceRolls.every(die => die <= 3); // Example condition: all dice <= 3
    if (winCondition) {
        let bonusAmount = 20;
        document.getElementById('status-text').innerText = `Dice win! You won ${bonusAmount} coins!`;
        coinBalance += bonusAmount;
        updateCoinBalance();
    } else {
        document.getElementById('status-text').innerText = "Dice roll lost. No coins won.";
    }
}
