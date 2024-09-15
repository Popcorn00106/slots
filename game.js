// Initial Game Setup
let coinBalance = parseInt(localStorage.getItem('coinBalance')) || 100;
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
    if (currentGameMode === 'base' && Math.random() < 0.2) { // 20% chance to trigger a question
        showQuestion();
    } else {
        spinButton.disabled = false; // Re-enable spin button
    }
}

function getRandomSymbol() {
    return reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
}

function checkWin(reels) {
    // Placeholder logic to check if the player has won
    const payoutTable = {
        '$': 30,
        '7': 50,
        '*': 20
    };

    const symbolCount = {};
    reels.forEach(symbol => {
        symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
    });

    let winnings = 0;
    for (const [symbol, count] of Object.entries(symbolCount)) {
        if (count >= 3) { // Basic payout logic
            winnings += payoutTable[symbol] || 0;
        }
    }

    if (winnings > 0) {
        coinBalance += winnings;
        document.getElementById('status-text').innerText = `You won ${winnings} coins!`;
    } else {
        document.getElementById('status-text').innerText = "No win this time.";
    }

    updateCoinBalance();
}

function updateCoinBalance() {
    localStorage.setItem('coinBalance', coinBalance);
    document.getElementById('coin-balance').innerText = coinBalance;
}

function showQuestion() {
    const questionSection = document.getElementById('question-section');
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    document.getElementById('question-text').innerText = randomQuestion.text;
    const choiceButtons = questionSection.querySelectorAll('.choice-button');

    choiceButtons.forEach((button, index) => {
        button.innerText = randomQuestion.choices[index].text;
        button.onclick = () => handleChoice(randomQuestion.choices[index].value);
    });

    questionSection.style.display = 'block';
}

function handleChoice(diceSides) {
    document.getElementById('question-section').style.display = 'none';
    
    const diceRoll = rollDice(diceSides);
    document.getElementById('status-text').innerText = `Dice roll: ${diceRoll}`;
    
    // Adjust game state based on dice roll
    // Implement the logic to use dice roll to affect odds or game state here

    spinButton.disabled = false; // Re-enable spin button after choice
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

