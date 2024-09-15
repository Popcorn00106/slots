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
