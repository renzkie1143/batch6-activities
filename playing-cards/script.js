const suits = ['♤', '♡', '♧', '♢'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cards = [];

createCards(suits, ranks);
console.log('create', cards);

const shuffle = shuffleCards(cards);
console.log('shuffle', shuffle);

const sort = sortCards(cards);
console.log('sort', sort);

const ascending = ascendingCards(cards);
console.log('ascending', ascending);

const descending = descendingCards =(cards);
console.log('descending', descending);

function createCards(suits, ranks)
{
    for(const suit of suits)
    {
        for(const [rank_index, rank] of ranks.entries())
        {
            cards.push({
                rank : rank,
                suit: suit,
                index: rank_index
            });
        }
    }
}
function shuffleCards(cards)
{
    const cardsToShuffle = Array.from(cards);
    return cardsToShuffle.sort(() => Math.random() - 0.5);
}
function sortCards(shuffledCards)
{
    const cardsToShuffle = Array.from(shuffledCards);
    return cardsToShuffle.sort((a, b) => {
        if(a.suit < b.suit)
        {
            return -1;
        }
        if(a.suit > b.suit)
        {
            return 1;
        }
        return 0;
    });
}
function ascendingCards(shuffledCards)
{
    const cardsToAscend = Array.from(shuffledCards);
    return cardsToAscend.sort((a, b) => {
        return a.sort - b.sort;
    });
}

function descendingCards(shuffledCards)
{
    const cardsToAscend = Array.from(shuffledCards);
    return cardsToAscend.sort((a, b) => {
        return b.sort - a.sort;
    });
}