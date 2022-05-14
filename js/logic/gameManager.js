
class GameManager {
    #currentPlayer = null;
    playerCardsVM = null;
    
    constructor(playerChain) {
        this.#currentPlayer = playerChain;
    }

    gameStart() {
        console.log("【ゲーム開始】");
        this.#roundStart();
    }

    async #roundStart() {
        console.log("【ラウンド開始】");

        // 1位と最下位でカードの交換を行う。
        const players = this.#currentPlayer.chainToArray();
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];

        const firstPlacePlayerCard = await firstPlacePlayer.selectExchangeCards();
        const lastPlacePlayerCard = await lastPlacePlayer.selectExchangeCards();
        
        console.log("【カードの交換】");
        console.log("交換前");
        console.log("firstPlacePlayer: " + firstPlacePlayer.cards.map(c => c.name).join(", "));
        console.log("lastPlacePlayer: " + lastPlacePlayer.cards.map(c => c.name).join(", "));
        console.log("交換するカード");
        console.log("firstPlacePlayer: " + firstPlacePlayerCard.map(c => c.name).join(", "));
        console.log("lastPlacePlayer: " + lastPlacePlayerCard.map(c => c.name).join(", "));

        this.#exchangeCards(firstPlacePlayer, lastPlacePlayer, firstPlacePlayerCard, lastPlacePlayerCard);
        
        console.log("交換後");
        console.log("firstPlacePlayer: " + firstPlacePlayer.cards.map(c => c.name).join(", "));
        console.log("lastPlacePlayer: " + lastPlacePlayer.cards.map(c => c.name).join(", "));

        if (Common.isPlayer(firstPlacePlayer)) {
            this.playerCardsVM.playerCards = firstPlacePlayer.cards.map(c => {
                return new CardModel(c)
            });
        }
        else if (Common.isPlayer(lastPlacePlayer)) {
            this.playerCardsVM.playerCards = lastPlacePlayer.cards.map(c => {
                return new CardModel(c)
            });
        }
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
        player1.cards = player1.cards.filter(c => cards1.filter(d => c.id === d.id).length === 0).concat(cards2);
        player2.cards = player2.cards.filter(c => cards2.filter(d => c.id === d.id).length === 0).concat(cards1);

        Common.sortCards(player1.cards);
        Common.sortCards(player2.cards);
    }
}
