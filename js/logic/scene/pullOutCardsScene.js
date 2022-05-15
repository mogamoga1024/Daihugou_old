
class PullOutCardsScene extends Scene {
    #player = null;
    #playerCardsVM = null;
    #cpuListVM = null;

    constructor(gameManager, player) {
        super(gameManager);
        this.#playerCardsVM = gameManager.playerCardsVM;
        this.#cpuListVM = gameManager.cpuListVM;
        this.#player = player;
    }

    #setUp() {
        this.#playerCardsVM.isPlayerTurn = this.#player.isHuman;

        if (this.#player.isHuman) {
            this.#playerCardsVM.canPass = true;
            // TODO 出せるカードの制限（Vue）
            const selectableCards = Rule.findSelectableCards(this.gameManager.battleFieldCards, this.#player.cards);

            this.#playerCardsVM.playerCardModels.forEach(c => {
                if (selectableCards.filter(d => c.card.id === d.id).length === 0) {
                    c.canSelect = false;
                }
            });
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

            this.gameManager.battleFieldCards = selectedCards;

            if (this.#player.isHuman) {
                this.#playerCardsVM.playerCardModels = this.#playerCardsVM.cardListToPlayerCardModelList(this.#player.cards);
            }
            else {
                this.#cpuListVM.getCpuModel(this.#player.id).cardsCount -= 1;
            }
        }

        this.#tearDown();
        
        const nextActivePlayer = this.#player.nextActivePlayer;

        if (nextActivePlayer.isHuman === false) {
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
