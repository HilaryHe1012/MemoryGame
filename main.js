const cards = document.querySelectorAll('.memory-card');

let image_array = ["abe-christmas.jpg", "abe-cute.jpg", "abe-dd.jpg", "abe-flower.jpg", 
                "abe-soreSnow.jpg", "abe-suits.jpg", "abe-summer.jpg", "abe-awu.jpg", "abe-bear.jpg", "abe-mcFlower.jpg",
                "date-christmas.jpg", "date-cute.jpg", "date-dd.jpg", "date-flower.jpg", 
                "date-soreSnow.jpg", "date-suits.jpg", "date-summer.jpg", "date-awu.jpg", "date-bear.jpg", "date-mcFlower.jpg",
                "fukka-christmas.jpg", "fukka-cute.jpg", "fukka-dd.jpg", "fukka-flower.jpg", 
                "fukka-soreSnow.jpg", "fukka-suits.jpg", "fukka-summer.jpg", "fukka-awu.jpg", "fukka-bear.jpg", "fukka-mcFlower.jpg",
                "hikkun-christmas.jpg", "hikkun-cute.jpg", "hikkun-dd.jpg", "hikkun-flower.jpg", 
                "hikkun-soreSnow.jpg", "hikkun-suits.jpg", "hikkun-summer.jpg", "hikkun-awu.jpg", "hikkun-bear.jpg", "hikkun-mcFlower.jpg",
                "koji-christmas.jpg", "koji-cute.jpg", "koji-dd.jpg", "koji-flower.jpg", 
                "koji-soreSnow.jpg", "koji-suits.jpg", "koji-summer.jpg", "koji-awu.jpg", "koji-bear.jpg", "koji-mcFlower.jpg",
                "meme-christmas.jpg", "meme-cute.jpg", "meme-dd.jpg", "meme-flower.jpg", 
                "meme-soreSnow.jpg", "meme-suits.jpg", "meme-summer.jpg", "meme-awu.jpg", "meme-bear.jpg", "meme-mcFlower.jpg",
                "nabe-christmas.jpg", "nabe-cute.jpg", "nabe-dd.jpg", "nabe-flower.jpg", 
                "nabe-soreSnow.jpg", "nabe-suits.jpg", "nabe-summer.jpg", "nabe-awu.jpg", "nabe-bear.jpg", "nabe-mcFlower.jpg",
                "raul-christmas.jpg", "raul-cute.jpg", "raul-dd.jpg", "raul-flower.jpg", 
                "raul-soreSnow.jpg", "raul-suits.jpg", "raul-summer.jpg", "raul-awu.jpg", "raul-bear.jpg", "raul-mcFlower.jpg",
                "skm-christmas.jpg", "skm-cute.jpg", "skm-dd.jpg", "skm-flower.jpg", 
                "skm-soreSnow.jpg", "skm-suits.jpg", "skm-summer.jpg","skm-awu.jpg", "skm-bear.jpg","skm-mcFlower.jpg",];
let valentine_special = [];
let image_id = ['datesama', 'date','meguro','meme','koji','koikoisu','iwamoto','hikkun','raul', 'raull','sakuma','sakkun','watanabe','shota','fukka','mama']
    

let selected_images = [];
let selected_idxes = [];
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let matchedCard = 0;
let disableDeck = false;

function get_random_index() {
    
    if (selected_idxes.length >= 8) {
        selected_idxes = [];
    }

    while (selected_idxes.length < 8) {
        let idx = Math.floor(Math.random() * image_array.length);

        if (!selected_idxes.includes(idx)) {
            selected_idxes.push(idx);
            }
    }
    return selected_idxes;
}

function get_random_image() {
    
    get_random_index();
    if (selected_images.length >= 8) {
        selected_images = [];
    }

    while (selected_images.length < 8) {
        for (const item of selected_idxes) {
            selected_images.push(image_array[item]);
        }
    }

    for (const id of image_id) {
        switch (id) {
            case 'datesama':
            case 'date':
                document.getElementById(id).src = `./snowman/${selected_images[0]}`;
                break;
            case 'meguro':
            case 'meme':
                document.getElementById(id).src = `./snowman/${selected_images[1]}`;
                break;
            case 'koji':
            case 'koikoisu':
                document.getElementById(id).src = `./snowman/${selected_images[2]}`;
                break;
            case 'iwamoto':
            case 'hikkun':
                document.getElementById(id).src = `./snowman/${selected_images[3]}`;
                break;
            case 'raul':
            case 'raull':
                document.getElementById(id).src = `./snowman/${selected_images[4]}`;
                break;
            case 'sakuma':
            case 'sakkun':
                document.getElementById(id).src = `./snowman/${selected_images[5]}`;
                break;
            case 'watanabe':
            case 'shota':
                document.getElementById(id).src = `./snowman/${selected_images[6]}`;
                break;
            case 'fukka':
            case 'mama':
                document.getElementById(id).src = `./snowman/${selected_images[7]}`;
                break;
        }
    }
    
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    } 
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
    }

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        matchedCard++; 
        disableCards();
    } else {
        unflipCards();
    }

    if (matchedCard == 8) {
        setTimeout(() => {
            resetBoard();
            return shuffle();
        }, 1200);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

 setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    matchedCard = 0;

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
        get_random_image();
    })
}

shuffle();

cards.forEach(card => {
    card.addEventListener('click', flipCard); 
})