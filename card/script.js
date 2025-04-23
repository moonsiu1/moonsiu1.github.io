const images = [
    './images/card1.png',
    './images/card2.png',
    './images/card3.png',
    './images/card4.png',
    './images/card5.png',
    './images/card6.png',
];

const cards = [...images, ...images];
shuffle(cards);

function shuffle(array) {
    for(let i=array.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const gameBoard = document.getElementById('gameBoard');

cards.forEach((src, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.name = src;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${src}">
            </div>
            <div class="card-back"></div>
        </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
});

let flippedCards = [];
let lockBoard = false;

function flipCard(card) {
    if(lockBoard || flippedCards.includes(card)) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if(flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if(first.dataset.name === second.dataset.name) {
            flippedCards = [];
        }
        else {
            lockBoard = true;
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }
}