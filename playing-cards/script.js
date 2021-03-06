const suits = ['♤', '♡', '♧', '♢'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cards = [];
createCards(suits, ranks);
console.log('create cards', cards);
const shuffle = shuffleCards(cards);
console.log("shuffle" , shuffle)
// shufflecard
const sort = sortCards(shuffle);
console.log("sort" , sort)
// ascendingCards
const ascending = ascendingCards(shuffle);
console.log("ascending",ascending )
// descendingCard
const descending = descendingCards(shuffle);
console.log("descending",descending);
// dealCard
let deal = dealCard(cards[0])
let deal2 = dealCard(cards[0])
let deal3 = dealCard(cards[0])
let deal4 = dealCard(cards[0])
console.log(deal);
console.log(deal2);
console.log(deal3);
console.log(deal4);
console.log('total cards', cards.length);
console.log('updated cards after deal', cards);

function createCards(suits, ranks) {
    for(const suit of suits) {
        for(const [rank_index, rank] of ranks.entries()) {
            cards.push({
                rank,
                suit,
                index: rank_index
            });
        }
    }
}
function shuffleCards(cards) {
    const cardsToShuffle = Array.from(cards);
    return cardsToShuffle.sort(() => Math.random() - 0.5);
}
function sortCards(shuffledCards) {
    return shuffledCards.sort((a, b) => {
        if(a.suit < b.suit) {
            return -1;
        } if(a.suit > b.suit) {
            return 1;
        }
    });
}
function ascendingCards(shuffledCards) {
    const cardsToAscend = Array.from(shuffledCards);
    const separator = [[], [], [], []]

    for (let n of cardsToAscend) {
        n.suit == '♤' ? separator[0].push(n) : n.suit == '♡' ? separator[1].push(n) : n.suit == '♧' ? separator[2].push(n) : separator[3].push(n)
    }
    separator.map(item => {
        item.sort((a, b) => {
            return a.index - b.index
        }); return item
    })
    return [].concat.apply([], separator)
}
function descendingCards(shuffledCards) {
    const cardsToAscend = Array.from(shuffledCards);
    const separator = [[], [], [], []]

    for (let n of cardsToAscend) {
        n.suit == '♤' ? separator[0].push(n) : n.suit == '♡' ? separator[1].push(n) : n.suit == '♧' ? separator[2].push(n) : separator[3].push(n)
    }
    separator.map(item => {
        item.sort((a, b) => {
            return b.index - a.index
        }); return item
    })

    return [].concat.apply([], separator)
}
function dealCard(card) {
    const abbr = {
        suitsName: {
            Spades: '♤',
            Hearts: '♡',
            Cloves: '♧',
            Diamonds: '♢'
        },
        cardName: {
            Ace: 'A',
            One: '1',
            Two: '2',
            Three: '3',
            Four: '4',
            Five: '5',
            Six: '6',
            Seven: '7',
            Eight: '8',
            Nine: '9',
            Jack: 'J',
            Queen: 'Q',
            King: 'K'
        }
    }
    let str = ''
    for (let x in abbr.cardName) {
        abbr.cardName[x] == card.rank ? str += x : str
    }
    str += ' of '
    for (let x in abbr.suitsName) {
        abbr.suitsName[x] == card.suit ? str += x : str
    }
    cards.splice(cards.findIndex(item => item.rank == card.rank && item.suit == card.suit && item.index == card.index), 1)
    return str
}