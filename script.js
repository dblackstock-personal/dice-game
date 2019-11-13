class DieFace {
    constructor(number, image) {
        this.number = number;
        this.image = image
    }
}

//create all of our faces for the six-sided die
const dieOne = new DieFace(1, `./img/dice1.png`);
const dieTwo = new DieFace(2, `./img/dice2.png`);
const dieThree = new DieFace(3, `./img/dice3.png`);
const dieFour = new DieFace(4, `./img/dice4.png`);
const dieFive = new DieFace(5, `./img/dice5.png`);
const dieSix = new DieFace(6, `./img/dice6.png`);

//This is the six-sided die. This would need to be changed to a class if we wanted to open it up to dice with different numbers of faces
let die = [dieOne, dieTwo, dieThree, dieFour, dieFive, dieSix];

//Player class. Needs to have variables for name, current total and number of rolls taken so far.
//TODO

//Record screen elements for manipulation
const roll = document.getElementById(`roll`);
const titleMessage = document.getElementById(`start-message`);
const begin = document.getElementById(`begin`);
const restart = document.getElementById(`restart`);
const result = document.getElementsByClassName(`result`)[0];
const counter = document.getElementsByClassName(`counter`)[0];
const player1 = document.getElementById(`player1`);
const player2 = document.getElementById(`player2`);

let runningTotal = 0;
let numberOfRolls = 0;
let diePlaceholder = `<img src="./img/dicePlaceholder.png" alt=dieplaceholder>`;
let player1name = `Player1`;

//Code for rolling dice etc

const initialiseGame = () => {
    roll.style.visibility = "visible";
    titleMessage.style.visibility = "hidden";
    begin.style.visibility = "hidden";
    player1.style.visibility = "visible";
    restart.style.visibility = "hidden";
    result.style.visibility = "visible";
    result.innerHTML = diePlaceholder;
    runningTotal = 0;
    counter.textContent = runningTotal;
    counter.style.visibility = "visible";
    numberOfRolls = 0;
    player1.textContent = player1name;
}

const rollDie = () => {
    let randomNumber = (Math.ceil(Math.random() * 6));
    return die[randomNumber - 1];
}

const updateWithDieResult = (resultDie) => {
    result.innerHTML = `<img src="${resultDie.image}" alt=${resultDie.number}>`;

    runningTotal += resultDie.number;
    numberOfRolls++;
    counter.textContent = runningTotal;
}

const checkGameOver = (resultDie) => {
    if (runningTotal >= 20) {
        player1.textContent = `YOU WIN YOU WIN`;
        roll.style.visibility = "hidden";
        restart.style.visibility = "visible";
    } else if (resultDie.number == 1) {
        player1.textContent = `YOU LOSE YOU LOSE`;
        roll.style.visibility = "hidden";
        restart.style.visibility = "visible";
    }
}

roll.addEventListener(`click`, () => {
    let resultDie = rollDie();
    updateWithDieResult(resultDie);
    checkGameOver(resultDie);
});

restart.addEventListener(`click`, () => {
    initialiseGame();
});

begin.addEventListener(`click`, () => {
    initialiseGame();
});