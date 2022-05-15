
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

        const exchangeCardsScene = new ExchangeCardsScene(this, firstPlacePlayer, lastPlacePlayer);

        await exchangeCardsScene.start();

        // 最下位からスタート
        await this.#pullOutCardsScene(lastPlacePlayer);
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
