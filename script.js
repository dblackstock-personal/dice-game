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
let diePlaceholder = `<img src="./img/dicePlaceholder.png" alt=dieplaceholder>`;

//This is the six-sided die. This would need to be changed to a class if we wanted to open it up to dice with different numbers of faces
let die = [dieOne, dieTwo, dieThree, dieFour, dieFive, dieSix];

//Record screen elements for manipulation
const titleMessage = document.getElementById(`start-message`);
const begin = document.getElementById(`begin`);
const roll = document.getElementById(`roll`);
const hold = document.getElementById(`hold`);
const restart = document.getElementById(`restart`);
const result = document.getElementsByClassName(`result`)[0];
const counterp1 = document.getElementsByClassName(`player1counter`)[0];
const counterp2 = document.getElementsByClassName(`player2counter`)[0];
const heldp1 = document.getElementsByClassName(`player1held`)[0];
const heldp2 = document.getElementsByClassName(`player2held`)[0];
const screenPlayer1 = document.getElementById(`player1`);
const screenPlayer2 = document.getElementById(`player2`);

//Player class. Needs to have variables for name, current total and number of rolls taken so far.

class Player {
    constructor(name, screenCurrent, screenHeld, screenName){
        this.name = name;
        this.current = 0;
        this.held = 0;
        this.numberOfRolls;
        this.screenCurrent = screenCurrent;
        this.screenHeld = screenHeld;
        this.screenName = screenName;
    }

    resetPlayer() {
    this.current = 0;
    this.held = 0;
    this.screenCurrent.textContent = `counter: ${this.current}`;
    this.screenHeld.textContent = `held: ${this.held}`;
    this.screenCurrent.style.visibility = "visible";
    this.screenHeld.style.visibility = "visible";
    this.numberOfRolls = 0;
    this.screenName.style.visibility = "visible";
    this.screenName.textContent = this.name;
    }

    updateWithDieResult(resultDie) {
        result.innerHTML = `<img src="${resultDie.image}" alt=${resultDie.number}>`;
    
        this.current += resultDie.number;
        this.numberOfRolls++;
        this.screenCurrent.textContent = `counter: ${this.current}`;
    }

    checkGameOver (resultDie) {
        if (this.held > 20) {
            titleMessage.style.visibility = "visible";
            titleMessage.textContent = `${this.name} WINS!`;
            roll.style.visibility = "hidden";
            restart.style.visibility = "visible";
        } else if (resultDie.number == 1) {
            this.current = 0;
            this.screenCurrent.textContent = this.current;
            changeActivePlayer();
        }
    }
}

let player1 = new Player('PlayerA',counterp1,heldp1,screenPlayer1);
let player2 = new Player('PlayerB',counterp2,heldp2,screenPlayer2);
//variables to allow for player switching.
let activePlayer = player1;

//Code for rolling dice etc

const initialiseGame = () => {
    roll.style.visibility = "visible";
    hold.style.visibility = "visible";
    titleMessage.style.visibility = "hidden";
    begin.style.visibility = "hidden";
    restart.style.visibility = "hidden";
    result.style.visibility = "visible";
    result.innerHTML = diePlaceholder;
    player1.resetPlayer();
    player2.resetPlayer();
    if (activePlayer == player2){       //to make sure player1 always starts. Could be neater since the logic is within changeActivePlayer() also
        changeActivePlayer();
    }
}

const rollDie = () => {
    let randomNumber = (Math.ceil(Math.random() * 6));
    return die[randomNumber - 1];
}

//changes the active player to be whatever the other player is
//quite brittle, would need changing to support more players
//could probably be done with an array of players instead
const changeActivePlayer = () => {
    activePlayer.current = 0;
    activePlayer.screenCurrent.textContent = `current: ${activePlayer.current}`;
    activePlayer.screenCurrent = activePlayer.current;
    if(activePlayer == player1){
        activePlayer = player2;
        player1.screenName.style.color=`black`;
        player2.screenName.style.color=`red`;
    } else{
         activePlayer = player1;
         player1.screenName.style.color=`red`;
        player2.screenName.style.color=`black`;
    }
}

roll.addEventListener(`click`, () => {
    let resultDie = rollDie();
    activePlayer.updateWithDieResult(resultDie);
    activePlayer.checkGameOver(resultDie);
});

hold.addEventListener(`click`, () => {
    activePlayer.held += activePlayer.current;
    console.log(activePlayer.held);
    activePlayer.screenHeld.textContent = `held: ${activePlayer.held}`;
    activePlayer.checkGameOver(2);  //passing this a 2 just so that it isn't a 1, since we only want to check if the player has won
    changeActivePlayer();
})

restart.addEventListener(`click`, () => {
    initialiseGame();
});

begin.addEventListener(`click`, () => {
    initialiseGame();
});