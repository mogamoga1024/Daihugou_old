
class PullOutCardsScene extends Scene {
    #player = null;
    #playerCardsVM = null;
    #cpuListVM = null;
    #battleFieldVM = null;

    constructor(gameManager, player) {
        super(gameManager);
        this.#playerCardsVM = gameManager.playerCardsVM;
        this.#cpuListVM = gameManager.cpuListVM;
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#player = player;
    }

    #setUp() {
        this.#playerCardsVM.isPlayerTurn = Common.isPlayer(this.#player);

        if (Common.isPlayer(this.#player)) {
            this.#playerCardsVM.canPass = true;
            // TODO 出せるカードの制限（Vue）
        }
    }

    async start() {
        console.log("【カードを出す】");

        this.#setUp();

        const selectedCards = await this.#player.pullOutCards();

        if (selectedCards.length === 0) {
            console.log("パス");
        }
        else {
            console.log("出したカード");
            console.log(Common.cardListToString(selectedCards));

            this.#battleFieldVM.cards = selectedCards;

            if (Common.isPlayer(this.#player)) {
                this.#playerCardsVM.playerCardModels = this.#playerCardsVM.cardListToPlayerCardModelList(this.#player.cards);
            }
            else {
                this.#cpuListVM.getCpuModel(this.#player.id).cardsCount -= 1;
            }
        }

        this.#tearDown();
        
        const nextActivePlayer = this.#player.nextActivePlayer;

        if (Common.isPlayer(nextActivePlayer) === false) {
            await Common.sleep(1200);
        }

        if (nextActivePlayer === nextActivePlayer.nextActivePlayer) {
            // TODO ゲーム終了
            return null;
        }
        
        return new PullOutCardsScene(this.gameManager, nextActivePlayer);
    }

    #tearDown() {
        this.#playerCardsVM.canPass = false;
        this.#playerCardsVM.isPlayerTurn = false;
    }
}
