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

    // Generate random symbols for the 3 reels
    const reel1 = getRandomSymbol();
    const reel2 = getRandomSymbol();
    const reel3 = getRandomSymbol();

    // Update the reel displays
    document.getElementById('reel-1').innerText = reel1;
    document.getElementById('reel-2').innerText = reel2;
    document.getElementById('reel-3').innerText = reel3;

    // Check if the player won
    checkWin(reel1, reel2, reel3);

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

function checkWin(r1, r2, r3) {
    if (r1 === r2 && r2 === r3) {
        let winAmount = 10;
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
    // Simple placeholder logic, can be extended to more complex outcomes
    const winCondition = diceRolls.every(die => die <= 3); // Example condition: all dice rolls <= 3
    if (winCondition) {
        let bonusAmount = 20;
        document.getElementById('status-text').innerText = `Dice win! You won ${bonusAmount} coins!`;
        coinBalance += bonusAmount;
        updateCoinBalance();
    } else {
        document.getElementById('status-text').innerText = "Dice roll lost. No coins won.";
    }
}

