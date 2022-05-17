
class PullOutCardsScene extends Scene {
    #player = null;
    #battleFieldVM = null;
    #playerItemVM = null;
    #cpuListVM = null;
    #isFlowStart = false;

    constructor(gameManager, player, isFlowStart) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#playerItemVM = gameManager.playerItemVM;
        this.#cpuListVM = gameManager.cpuListVM;
        this.#player = player;
        this.#isFlowStart = isFlowStart;
    }

    #setUp() {
        this.#playerItemVM.isPlayerTurn = this.#player.isHuman;

        if (this.#player.isHuman) {
            this.#playerItemVM.canPass = !this.#isFlowStart;
            if (this.#player.forcePass) {
                this.#playerItemVM.playerCardModels.map(c => c.canSelect = false);
            }
            else {
                // TODO 出せるカードの制限（Vue）
                const selectableCards = Rule.findSelectableCards(this.#battleFieldVM.cards, this.#player.cards);

                console.log("選択可能なカード");
                console.log(Common.cardListToString(selectableCards));

                this.#playerItemVM.playerCardModels.forEach(c => {
                    if (selectableCards.filter(d => c.card.id === d.id).length === 0) {
                        c.canSelect = false;
                    }
                });
            }
        }
    }

    async start() {
        if (this.#isFlowStart) {
            console.log("【フロー開始】");
        }

        console.log("【カードを出す】");
        console.log("ranking: " + this.#player.ranking);

        this.#setUp();

        const selectedCards = await this.#player.pullOutCards(this.#battleFieldVM.cards);

        if (selectedCards.length === 0) {
            this.#player.forcePass = true;
            console.log("パス");
        }
        else {
            console.log("出したカード");
            console.log(Common.cardListToString(selectedCards));

            this.#battleFieldVM.cards = selectedCards;

            if (this.#player.isHuman) {
                this.#playerItemVM.playerCardModels = this.#playerItemVM.cardListToPlayerCardModelList(this.#player.cards);
            }
            else {
                this.#cpuListVM.getCpuModel(this.#player.id).cardsCount -= 1;
            }
        }

        this.#cleanUp();
        
        const nextActivePlayer = this.#player.nextActivePlayer;

        console.log("nextActivePlayer.ranking: " + nextActivePlayer.ranking);
        console.log("nextActivePlayer.latestPullOutCard: " + nextActivePlayer.latestPullOutCard.name);
        console.log("this.#battleFieldVM.cards[0].name: " + this.#battleFieldVM.cards[0].name);

        if (nextActivePlayer === nextActivePlayer.nextActivePlayer) {
            // ゲーム終了

            // ゲーム終了シーン前に最後に出したカードを数秒見せる。
            Common.sleep();

            this.#flowEndCleanUp();

            return new GameEndScene(this.gameManager);
        }
        else if (
            this.#battleFieldVM.cards.length > 0 && nextActivePlayer.latestPullOutCard.id === this.#battleFieldVM.cards[0].id
            || this.#player.isActive === false
        ) {
            // フロー終了

            if (this.#player.isActive === false) {
                console.log("あがり");
            }

            this.#flowEndCleanUp();

            console.log("フロー終了");
            
            return new PullOutCardsScene(this.gameManager, nextActivePlayer, true);
        }
        else {
            // 次のプレイヤーのターンへ
            return new PullOutCardsScene(this.gameManager, nextActivePlayer, false);
        }
    }

    #cleanUp() {
        this.#playerItemVM.canPass = false;
        this.#playerItemVM.isPlayerTurn = false;
    }

    #flowEndCleanUp() {
        this.#battleFieldVM.cards = [];
        this.#player.allPlayerList.map(p => p.forcePass = false);
    }
}
