const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'ana',
    'ariel',
    'bela',
    'branca-de-neve',
    'cinderela',
    'elsa',
    'jasmine',
    'moana',
    'sininho',
    'tiana'
];

const createCardElement = (tag, cardClassName) => {
    const element = document.createElement(tag);
    element.className = cardClassName;
    return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    const reloadButton = document.querySelector('.reload-btn')

    if (disabledCards.length === 20) {
        setTimeout(() => {
            clearInterval(this.loop);

            alert(`Parabéns, ${spanPlayer.innerHTML}! Você ganhou! Seu tempo foi ${currentTime} segundos!`);

            reloadButton.style.display = 'block';
            reloadButton.addEventListener('click', () => location.reload())
            
        }, 500);

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const SecondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === SecondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    };
};

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    };

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;

        checkCards();
    }

};

const createCard = (character) => {
    const card = createCardElement('div', 'card');
    const front = createCardElement('div', 'face front');
    const back = createCardElement('div', 'face back');

    card.appendChild(front);
    card.appendChild(back);

    front.style.backgroundImage = `url(../images/${character}.png)`

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach(character => {
        const card = createCard(character);
        grid.appendChild(card)
    });
};

let currentTime = 0;

const startTimer = () => {
    this.loop = setInterval(() => {
        currentTime++;

        timer.innerHTML = currentTime;
        if (currentTime<10) {
            timer.innerHTML = `0${currentTime}`;
        }

        if (currentTime>=60 && currentTime<120) {
            let minuteTime = currentTime-60
            if (minuteTime<10) {
                timer.innerHTML = `1:0${minuteTime}`;
            } else {
                timer.innerHTML = `1:${minuteTime}`;
            }
        }

        if (currentTime>=120 && currentTime<180) {
            let minuteTime = currentTime-120
            if (minuteTime<10) {
                timer.innerHTML = `2:0${minuteTime}`;
            } else {
                timer.innerHTML = `2:${minuteTime}`;
            }
        }

        if (currentTime>=180 && currentTime<240) {
            let minuteTime = currentTime-120
            if (minuteTime<10) {
                timer.innerHTML = `3:0${minuteTime}`;
            } else {
                timer.innerHTML = `3:${minuteTime}`;
            }
        }

    }, 1000);
}

window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;

    startTimer();
    loadGame();
}
