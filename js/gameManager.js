
class GameManager {
    #currentPlayer = null;

    constructor(playerChain) {
        this.#currentPlayer = playerChain;
    }

    /**
     * @param {Player|Cpu} player1 
     * @param {Player|Cpu} player2 
     * @param {Array<Card>} cards1 player1が交換するカード
     * @param {Array<Card>} cards2 player2が交換するカード
     */
    #exchangeCard(player1, player2, cards1, cards2) {
        if (cards1.length !== cards2.length) {
            throw new Error("交換する枚数が異なっています。");
        }
        player1.cards = player1.cards.filter(c => cards1.indexOf(c) === -1).concat(cards2);
        player2.cards = player2.cards.filter(c => cards2.indexOf(c) === -1).concat(cards1);
    }
}
