
class PullOutCardsScene extends Scene {
    #player = null;
    #playerCardsVM = null;
    #cpuListVM = null;
    #isFlowStart = false;

    constructor(gameManager, player, isFlowStart) {
        super(gameManager);
        this.#playerCardsVM = gameManager.playerCardsVM;
        this.#cpuListVM = gameManager.cpuListVM;
        this.#player = player;
        this.#isFlowStart = isFlowStart;
    }

    #setUp() {
        this.#playerCardsVM.isPlayerTurn = this.#player.isHuman;

        if (this.#player.isHuman) {
            this.#playerCardsVM.canPass = !this.#isFlowStart;
            // TODO 出せるカードの制限（Vue）
            const selectableCards = Rule.findSelectableCards(this.gameManager.battleFieldCards, this.#player.cards);

            console.log("選択可能なカード");
            console.log(Common.cardListToString(selectableCards));

            this.#playerCardsVM.playerCardModels.forEach(c => {
                if (selectableCards.filter(d => c.card.id === d.id).length === 0) {
                    c.canSelect = false;
                }
            });
        }
    }

    async start() {
        if (this.#isFlowStart) {
            console.log("【フロー開始】");
        }

        console.log("【カードを出す】");

        this.#setUp();

        const selectedCards = await this.#player.pullOutCards(this.gameManager.battleFieldCards);

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

        console.log("nextActivePlayer.ranking: " + nextActivePlayer.ranking);
        console.log("nextActivePlayer.latestPullOutCardId: " + nextActivePlayer.latestPullOutCardId);
        console.log("this.gameManager.battleFieldCards[0].id: " + this.gameManager.battleFieldCards[0].id);

        if (nextActivePlayer === nextActivePlayer.nextActivePlayer) {
            // TODO ゲーム終了
            return null;
        }
        else if (
            this.gameManager.battleFieldCards.length > 0 && 
            nextActivePlayer.latestPullOutCardId === this.gameManager.battleFieldCards[0].id
        ) {
            this.gameManager.battleFieldCards = [];
            
            if (nextActivePlayer.isHuman === false) {
                await Common.sleep(1200);
            }

            console.log("フロー終了");

            return new PullOutCardsScene(this.gameManager, nextActivePlayer, true);
        }
        
        return new PullOutCardsScene(this.gameManager, nextActivePlayer, false);
    }

    #tearDown() {
        this.#playerCardsVM.canPass = false;
        this.#playerCardsVM.isPlayerTurn = false;
    }
}
