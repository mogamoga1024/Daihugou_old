
class ExchangeCardsScene extends Scene {
    #playerCardsVM = null;
    #firstPlacePlayer = null;
    #lastPlacePlayer = null;

    constructor(gameManager, firstPlacePlayer, lastPlacePlayer) {
        super(gameManager);
        this.#playerCardsVM = gameManager.playerCardsVM;
        this.#firstPlacePlayer = firstPlacePlayer;
        this.#lastPlacePlayer = lastPlacePlayer;
    }

    #setUp() {
        this.#playerCardsVM.isPlayerTurn = Common.isPlayer(this.#firstPlacePlayer) || Common.isPlayer(this.#lastPlacePlayer);
        
        if (Common.isPlayer(this.#lastPlacePlayer)) {
            this.#playerCardsVM.isExchangeCardsScene = true;
            const cardsCount = this.#playerCardsVM.playerCardModels.length;
            this.#playerCardsVM.playerCardModels[cardsCount - 2].isSelected = true; // TODO 交換枚数
            this.#playerCardsVM.playerCardModels[cardsCount - 1].isSelected = true;
            this.#playerCardsVM.canSelectCards = false;
            this.#playerCardsVM.canOutputCards = true;
            this.#playerCardsVM.forceCardUnselectable = true;
        }
    }

    async start() {
        console.log("【カードの交換】");

        this.#setUp();

        const firstPlacePlayerCard = await this.#firstPlacePlayer.selectExchangeCards();
        const lastPlacePlayerCard = await this.#lastPlacePlayer.selectExchangeCards();
        
        console.log("交換前");
        console.log("this.#firstPlacePlayer: " + Common.cardListToString(this.#firstPlacePlayer.cards));
        console.log("this.#lastPlacePlayer: " + Common.cardListToString(this.#lastPlacePlayer.cards));
        console.log("交換するカード");
        console.log("this.#firstPlacePlayer: " + Common.cardListToString(firstPlacePlayerCard));
        console.log("this.#lastPlacePlayer: " + Common.cardListToString(lastPlacePlayerCard));

        this.#exchangeCards(this.#firstPlacePlayer, this.#lastPlacePlayer, firstPlacePlayerCard, lastPlacePlayerCard);
        
        console.log("交換後");
        console.log("this.#firstPlacePlayer: " + this.#firstPlacePlayer.cards.map(c => c.name).join(", "));
        console.log("this.#lastPlacePlayer: " + this.#lastPlacePlayer.cards.map(c => c.name).join(", "));

        this.#tearDown(this.#firstPlacePlayer, this.#lastPlacePlayer);

        // 最下位からスタート
        return new PullOutCardsScene(this.gameManager, this.#lastPlacePlayer)
    }

    #tearDown() {
        this.#playerCardsVM.isExchangeCardsScene = false;
        this.#playerCardsVM.forceCardUnselectable = false;

        if (Common.isPlayer(this.#firstPlacePlayer)) {
            this.#playerCardsVM.playerCardModels = this.#playerCardsVM.cardListToPlayerCardModelList(this.#firstPlacePlayer.cards);
        }
        else if (Common.isPlayer(this.#lastPlacePlayer)) {
            this.#playerCardsVM.playerCardModels = this.#playerCardsVM.cardListToPlayerCardModelList(this.#lastPlacePlayer.cards);
        }

        this.#playerCardsVM.isPlayerTurn = false;
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
