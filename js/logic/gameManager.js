
class GameManager {
    #currentPlayer = null;
    playerCardsVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    
    constructor(playerChain) {
        this.#currentPlayer = playerChain;
    }

    setStart() {
        console.log("【セット開始】");
        this.#gameStart();
    }

    async #gameStart() {
        console.log("【ゲーム開始】");

        // 1位と最下位でカードの交換を行う。
        const players = this.#currentPlayer.allPlayerList;
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];
        await this.#exchangeCardsScene(firstPlacePlayer, lastPlacePlayer);

        // 最下位からスタート
        await this.#pullOutCardsScene(lastPlacePlayer);
    }

    async #exchangeCardsScene(player1, player2) {
        console.log("【カードの交換】");
        this.playerCardsVM.isExchangeCardsScene = true;
        
        if (Common.isPlayer(player2)) {
            const cardsCount = this.playerCardsVM.playerCardModels.length;
            this.playerCardsVM.playerCardModels[cardsCount - 2].isSelected = true; // TODO 交換枚数
            this.playerCardsVM.playerCardModels[cardsCount - 1].isSelected = true;
            this.playerCardsVM.canSelectCards = false;
            this.playerCardsVM.canOutputCards = true;
            this.playerCardsVM.forceCardUnselectable = true;
        }

        const firstPlacePlayerCard = await player1.selectExchangeCards();
        const lastPlacePlayerCard = await player2.selectExchangeCards();
        
        console.log("交換前");
        console.log("player1: " + Common.cardListToString(player1.cards));
        console.log("player2: " + Common.cardListToString(player2.cards));
        console.log("交換するカード");
        console.log("player1: " + Common.cardListToString(firstPlacePlayerCard));
        console.log("player2: " + Common.cardListToString(lastPlacePlayerCard));

        this.#exchangeCards(player1, player2, firstPlacePlayerCard, lastPlacePlayerCard);
        
        console.log("交換後");
        console.log("player1: " + player1.cards.map(c => c.name).join(", "));
        console.log("player2: " + player2.cards.map(c => c.name).join(", "));

        this.playerCardsVM.isExchangeCardsScene = false;
        this.playerCardsVM.forceCardUnselectable = false;

        if (Common.isPlayer(player1)) {
            this.playerCardsVM.playerCardModels = Common.cardListToPlayerCardModelList(player1.cards);
        }
        else if (Common.isPlayer(player2)) {
            this.playerCardsVM.playerCardModels = Common.cardListToPlayerCardModelList(player2.cards);
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

    async #pullOutCardsScene(player) {
        console.log("【カードを出す】");

        if (Common.isPlayer(player)) {
            // TODO 出せるカードの制限（Vue）

        }

        const selectedCards = await player.pullOutCards();

        console.log("出したカード");
        console.log(Common.cardListToString(selectedCards));

        this.battleFieldVM.cards = selectedCards;

        if (Common.isPlayer(player)) {
            this.playerCardsVM.playerCardModels = Common.cardListToPlayerCardModelList(player.cards);
        }
        
        await Common.sleep(1200);

        // TODO 後の処理

        await this.#pullOutCardsScene(player.nextPlayer);
    }

}
