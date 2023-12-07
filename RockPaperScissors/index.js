const CHOICES = [
    {
        id: 0,
        name: "bear",
        beats: "ninja",
        item: "🐻",
    },
    {
        id: 1,
        name: "zombie",
        beats: "bear",
        item: "🧟‍♂️",
    },
    {
        id: 2,
        name: "ninja",
        beats: "zombie",
        item: "🥷🏽",
    },
];

const choiceDialog = document.getElementById("CHOICE_DIALOG");
const selected = choiceDialog.querySelector("select");
const confirmBtn = choiceDialog.querySelector("#CONFIRM_BTN");
const playerChoiceDisplay = document.querySelector("output");
const playerItemDisplay = document.querySelector("#PLAYER_ITEM");
const playerScoreDisplay = document.querySelector("#PLAYER_SCORE");
const computerChoiceDisplay = document.getElementById("COMPUTER_CHOICE");
const computerItemDisplay = document.querySelector("#COMPUTER_ITEM");
const computerScoreDisplay = document.querySelector("#COMPUTER_SCORE");
const round = document.querySelector("#ROUNDS");
const outcome = document.querySelector("#OUTCOME");

let playerPoints = 0;
let computerPoints = 0;
let roundOfGame = 0;

function startGame() {
    outcome.innerHTML = "";
    playerItemDisplay.innerHTML = "";
    computerItemDisplay.innerHTML = "";
    selected.value = "default";
    choiceDialog.showModal();
}

selected.addEventListener("change", (e) => {
    confirmBtn.value = selected.value;
});

choiceDialog.addEventListener("close", (e) => {
    myChoice = choiceDialog.returnValue;
    myChoice === "default"
        ? (outcome.innerHTML = "try again...")
        : myChoice === "cancel"
        ? (outcome.innerHTML = "")
        : playGame(myChoice);
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    choiceDialog.close(selected.value);
});

function playGame(myChoice) {
    roundOfGame++;
    round.lastChild.innerHTML = roundOfGame;

    let mySelection = CHOICES.find((selection) => selection.name === myChoice);
    playerItemDisplay.innerHTML = mySelection.item;

    let computerSelection = randomSelection(0, CHOICES.length - 1);
    computerItemDisplay.innerHTML = computerSelection.item;
    computerChoiceDisplay.innerHTML = computerSelection.name;

    let youWin = isWinner(mySelection, computerSelection);
    let compWin = isWinner(computerSelection, mySelection);

    //if it isn't a draw move into the test
    if (youWin !== compWin) {
        youWin
            ? (outcome.innerHTML = "You Win!")
            : (outcome.innerHTML = "You lose.");
        youWin ? (playerPoints += 1) : (computerPoints += 1);
        playerScoreDisplay.innerHTML = playerPoints;
        computerScoreDisplay.innerHTML = computerPoints;
    } else {
        outcome.innerHTML = "It's a draw.";
    }
}

function isWinner(selection, oppoSelection) {
    return selection.beats === oppoSelection.name;
}

function randomSelection(min, max) {
    let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return CHOICES[randomIndex];
}
