
class GameManager {
    #currentPlayer = null;

    constructor(playerChain) {
        this.#currentPlayer = playerChain;
    }

    gameStart() {
        this.#roundStart();
    }

    #roundStart() {
        // 1位と最下位でカードの交換を行う。
        // TODO 最下位は最も強いカードを交換する。
        const players = this.#currentPlayer.chainToArray();
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];

        const firstPlacePlayerCard = firstPlacePlayer.chooseExchangeCards();
        const lastPlacePlayerCard = lastPlacePlayer.chooseExchangeCards();

        this.#exchangeCards(firstPlacePlayer, lastPlacePlayer, firstPlacePlayerCard, lastPlacePlayerCard);
        
        console.log("hoge");
    }

    /**
     * @param {Player|Cpu} player1 
     * @param {Player|Cpu} player2 
     * @param {Array<Card>} cards1 player1が交換するカード
     * @param {Array<Card>} cards2 player2が交換するカード
     */
    #exchangeCards(player1, player2, cards1, cards2) {
        if (cards1.length !== cards2.length) {
            throw new Error("交換する枚数が異なっています。");
        }
        player1.cards = player1.cards.filter(c => cards1.indexOf(c) === -1).concat(cards2);
        player2.cards = player2.cards.filter(c => cards2.indexOf(c) === -1).concat(cards1);
    }
}
