
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

    #exchangeCardsSceneStart(highRankPlayer, lowRankPlayer) {
        this.playerCardsVM.isPlayerTurn = Common.isPlayer(highRankPlayer) || Common.isPlayer(lowRankPlayer);
        
        if (Common.isPlayer(lowRankPlayer)) {
            this.playerCardsVM.isExchangeCardsScene = true;
            const cardsCount = this.playerCardsVM.playerCardModels.length;
            this.playerCardsVM.playerCardModels[cardsCount - 2].isSelected = true; // TODO 交換枚数
            this.playerCardsVM.playerCardModels[cardsCount - 1].isSelected = true;
            this.playerCardsVM.canSelectCards = false;
            this.playerCardsVM.canOutputCards = true;
            this.playerCardsVM.forceCardUnselectable = true;
        }
    }

    async #exchangeCardsScene(highRankPlayer, lowRankPlayer) {
        console.log("【カードの交換】");

        this.#exchangeCardsSceneStart(highRankPlayer, lowRankPlayer);

        const firstPlacePlayerCard = await highRankPlayer.selectExchangeCards();
        const lastPlacePlayerCard = await lowRankPlayer.selectExchangeCards();
        
        console.log("交換前");
        console.log("highRankPlayer: " + Common.cardListToString(highRankPlayer.cards));
        console.log("lowRankPlayer: " + Common.cardListToString(lowRankPlayer.cards));
        console.log("交換するカード");
        console.log("highRankPlayer: " + Common.cardListToString(firstPlacePlayerCard));
        console.log("lowRankPlayer: " + Common.cardListToString(lastPlacePlayerCard));

        this.#exchangeCards(highRankPlayer, lowRankPlayer, firstPlacePlayerCard, lastPlacePlayerCard);
        
        console.log("交換後");
        console.log("highRankPlayer: " + highRankPlayer.cards.map(c => c.name).join(", "));
        console.log("lowRankPlayer: " + lowRankPlayer.cards.map(c => c.name).join(", "));

        this.#exchangeCardsSceneEnd(highRankPlayer, lowRankPlayer);
    }

    #exchangeCardsSceneEnd(highRankPlayer, lowRankPlayer) {
        this.playerCardsVM.isExchangeCardsScene = false;
        this.playerCardsVM.forceCardUnselectable = false;

        if (Common.isPlayer(highRankPlayer)) {
            this.playerCardsVM.playerCardModels = this.playerCardsVM.cardListToPlayerCardModelList(highRankPlayer.cards);
        }
        else if (Common.isPlayer(lowRankPlayer)) {
            this.playerCardsVM.playerCardModels = this.playerCardsVM.cardListToPlayerCardModelList(lowRankPlayer.cards);
        }

        this.playerCardsVM.isPlayerTurn = false;
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

    #pullOutCardsSceneStart(player) {
        this.playerCardsVM.isPlayerTurn = Common.isPlayer(player);

        if (Common.isPlayer(player)) {
            this.playerCardsVM.canPass = true;
            // TODO 出せるカードの制限（Vue）
        }
    }

    async #pullOutCardsScene(player) {
        console.log("【カードを出す】");

        this.#pullOutCardsSceneStart(player);

        const selectedCards = await player.pullOutCards();

        if (selectedCards.length === 0) {
            console.log("パス");
        }
        else {
            console.log("出したカード");
            console.log(Common.cardListToString(selectedCards));

            this.battleFieldVM.cards = selectedCards;

            if (Common.isPlayer(player)) {
                this.playerCardsVM.playerCardModels = this.playerCardsVM.cardListToPlayerCardModelList(player.cards);
            }
            else {
                this.cpuListVM.getCpuModel(player.id).cardsCount -= 1;
            }
        }

        this.#pullOutCardsSceneEnd(player);
        
        const nextActivePlayer = player.nextActivePlayer;

        if (Common.isPlayer(nextActivePlayer) === false) {
            await Common.sleep(1200);
        }

        if (nextActivePlayer === nextActivePlayer.nextActivePlayer) {
            // TODO ゲーム終了
            console.log("【ゲーム終了】");
            return;
        }
        
        this.#pullOutCardsScene(nextActivePlayer);
    }

    #pullOutCardsSceneEnd(player) {
        this.playerCardsVM.canPass = false;
        this.playerCardsVM.isPlayerTurn = false;
    }
}
