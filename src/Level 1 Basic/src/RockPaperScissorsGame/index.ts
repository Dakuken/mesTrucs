/* eslint-disable no-constant-condition */
/* eslint-disable indent */
/* eslint-disable default-case */
/* eslint-disable space-unary-ops */
const gamePlace = ['scissors', 'rock', 'paper'];

let counter = 0;

let iaWins = 0;

let playerWins = 0;

let equality = 0;

document.querySelectorAll('.player').forEach((player) => {
    player.addEventListener('click', () => {
        let result = start(<HTMLDivElement>player);
        switch (result) {
            case 'equality': equality++; winner('equality'); break;
            case 'ia': iaWins++; winner('ia'); break;
            case 'player': playerWins++; winner('player'); break;
        }
        maj();
    });
});

function start(player: HTMLDivElement) {
    counter++;
    let playerChoice = gamePlace.indexOf(player.id);
    let iaChoice = Math.floor(Math.random() * 3);
    iaShow(iaChoice);
    if (playerChoice === iaChoice) {
        return 'equality';
    }

    if (playerChoice === 0) {
        if (iaChoice === 1) {
            return 'ia';
        } return 'guys';
    }

    if (playerChoice === 1) {
        if (iaChoice === 2) {
            return 'ia';
        } return 'player';
    }

    if (playerChoice === 2) {
        if (iaChoice === 0) {
            return 'ia';
        } return 'guys';
    }

    return 'error';
}

function iaShow(res: number) {
    let iaChoose = (<HTMLParagraphElement>document.querySelector('#iaChoose'));
    if (res === 0) {
        iaChoose.textContent = '✌';
        return;
    }
    if (res === 1) {
        iaChoose.textContent = '✊';
        return;
    }

    iaChoose.textContent = '✋';
}

function winner(str: string) {
    console.log('tarace');
    console.log(str);

    if (str === 'equality') {
        (<HTMLParagraphElement>document.querySelector('#winner')).innerText = `${str}`;
        return;
    }
    (<HTMLParagraphElement>document.querySelector('#winner')).innerText = `${str} Won`;
}

function maj() {
    (<HTMLParagraphElement>document.querySelector('#Win')).innerText = `${playerWins}`;
    (<HTMLParagraphElement>document.querySelector('#Lose')).innerText = `${iaWins}`;
    (<HTMLParagraphElement>document.querySelector('#Total')).innerText = `${counter}`;
}
