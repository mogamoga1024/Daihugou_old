
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
        this.#playerCardsVM.isPlayerTurn = this.#firstPlacePlayer.isHuman || this.#lastPlacePlayer.isHuman;
        
        if (this.#lastPlacePlayer.isHuman) {
            this.#playerCardsVM.isExchangeCardsScene = true;
            if (player.rank === Rank.Hinmin || player.rank === Rank.Daihinmin) {
                const cardsCount = this.#playerCardsVM.playerCardModels.length;
                this.#playerCardsVM.playerCardModels[cardsCount - 2].isSelected = true; // TODO 交換枚数
                this.#playerCardsVM.playerCardModels[cardsCount - 1].isSelected = true;
                this.#playerCardsVM.playerCardModels.filter(c => c.isSelected === false).map(c => c.canSelect = false);
                this.#playerCardsVM.canOutputCards = true;
            }
        }
    }

    async start() {
        console.log("【カードの交換】");

        this.#setUp();

        const firstPlacePlayerCard = await this.#firstPlacePlayer.selectExchangeCards();
        const lastPlacePlayerCard = await this.#lastPlacePlayer.selectExchangeCards();
        
        console.log("交換前");
        console.log("firstPlacePlayer: " + Common.cardListToString(this.#firstPlacePlayer.cards));
        console.log("lastPlacePlayer: " + Common.cardListToString(this.#lastPlacePlayer.cards));
        console.log("交換するカード");
        console.log("firstPlacePlayer: " + Common.cardListToString(firstPlacePlayerCard));
        console.log("lastPlacePlayer: " + Common.cardListToString(lastPlacePlayerCard));

        this.#exchangeCards(this.#firstPlacePlayer, this.#lastPlacePlayer, firstPlacePlayerCard, lastPlacePlayerCard);
        
        console.log("交換後");
        console.log("firstPlacePlayer: " + this.#firstPlacePlayer.cards.map(c => c.name).join(", "));
        console.log("lastPlacePlayer: " + this.#lastPlacePlayer.cards.map(c => c.name).join(", "));

        this.#cleanUp(this.#firstPlacePlayer, this.#lastPlacePlayer);

        // 最下位からスタート
        return new PullOutCardsScene(this.gameManager, this.#lastPlacePlayer, true);
    }

    #cleanUp() {
        this.#playerCardsVM.isExchangeCardsScene = false;

        if (this.#firstPlacePlayer.isHuman) {
            this.#playerCardsVM.playerCardModels = this.#playerCardsVM.cardListToPlayerCardModelList(this.#firstPlacePlayer.cards);
        }
        else if (this.#lastPlacePlayer.isHuman) {
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
