
class PullOutCardsScene extends Scene {
    #player = null;
    #allPlayerList = [];
    #battleFieldVM = null;
    #playerItemVM = null;
    #cpuListVM = null;
    #isFlowStart = false;
    #cpuModel = null;

    constructor(gameManager, player, isFlowStart) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#playerItemVM = gameManager.playerItemVM;
        this.#cpuListVM = gameManager.cpuListVM;
        this.#player = player;
        this.#allPlayerList = player.allPlayerList;
        this.#isFlowStart = isFlowStart;
        if (player.isHuman === false) {
            this.#cpuModel = this.#cpuListVM.getCpuModel(this.#player.id);
        }
    }

    async start() {
        if (this.#isFlowStart) {
            console.log("【フロー開始】");
        }

        await this.#turnStart();

        if (this.#player.forcePass && this.#allPlayerList.filter(p => p.isActive && p.forcePass === false).length === 0) {
            // 前のプレイヤーが上がった状態で全員がパスした場合
            // フロー終了

            this.#allPlayerList.map(p => p.forcePass = false);

            this.#flowEndCleanUp();
            this.#playerItemVM.isPlayerTurn = false;
            this.#cpuModel.isTurn = false;

            console.log("フロー終了");
            
            return new PullOutCardsScene(this.gameManager, this.#player, true);
        }

        console.log("【カードを出す】");
        console.log("ranking: " + this.#player.ranking);

        this.#setUpVM();

        const selectedCards = await this.#player.pullOutCards(this.#battleFieldVM.cards);

        if (selectedCards.length === 0) {
            this.#player.forcePass = true;
            console.log("パス");
            this.#status(PlayerStatus.Pass);
        }
        else {
            console.log("出したカード");
            console.log(Common.cardListToString(selectedCards));

            this.#battleFieldVM.cards = selectedCards;

            if (this.#player.isHuman) {
                this.#playerItemVM.playerCardModels = this.#playerItemVM.cardListToPlayerCardModelList(this.#player.cards);
            }
            else {
                this.#cpuModel.cardsCount -= selectedCards.length;
            }
        }

        if (this.#player.isHuman) {
            this.#playerItemVM.canPass = false;
            this.#playerItemVM.isPlayerTurn = false;
            // 次のターンに行く前に場のカードを数秒見せる。
            await Common.sleep();
        }
        else {
            // 次のターンに行く前に場のカードを数秒見せる。
            await Common.sleep();
            this.#cpuModel.isTurn = false;
        }

        const nextActivePlayer = this.#player.nextActivePlayer;

        console.log("nextActivePlayer.ranking: " + nextActivePlayer.ranking);
        console.log("nextActivePlayer.latestPullOutCard: " + nextActivePlayer.latestPullOutCard.name);
        console.log("this.#battleFieldVM.cards[0].name: " + this.#battleFieldVM.cards[0].name);

        if (nextActivePlayer === nextActivePlayer.nextActivePlayer) {
            // 次のプレイヤーが最後の一人の場合
            // ゲーム終了

            console.log("あがり");
            this.#status(PlayerStatus.GameOver);

            this.#flowEndCleanUp();

            return new GameEndScene(this.gameManager);
        }
        else if (this.#battleFieldVM.cards.length > 0 && nextActivePlayer.latestPullOutCard.id === this.#battleFieldVM.cards[0].id) {
            // 次のプレイヤー以外が全員パスした場合
            // フロー終了

            this.#flowEndCleanUp();

            console.log("フロー終了");
            
            return new PullOutCardsScene(this.gameManager, nextActivePlayer, true);
        }
        else if (this.#player.isGameOver) {
            // 手札がなくなった場合
            // あがり

            console.log("あがり");
            this.#status(PlayerStatus.GameOver);

            this.#allPlayerList.map(p => p.forcePass = false);

            return new PullOutCardsScene(this.gameManager, nextActivePlayer, false);
        }
        else {
            // 次のプレイヤーのターンへ
            return new PullOutCardsScene(this.gameManager, nextActivePlayer, false);
        }
    }

    #setUpVM() {
        if (this.#player.isHuman) {
            this.#playerItemVM.canPass = !this.#isFlowStart;
            if (this.#player.forcePass) {
                this.#playerItemVM.playerCardModels.map(c => c.canSelect = false);
            }
            else {
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

    async #turnStart() {
        if (this.#player.isHuman) {
            this.#playerItemVM.isPlayerTurn = true;
        }
        else {
            this.#cpuModel.isTurn = true;
        }

        await Common.sleepRate(0.5);
    }

    #status(status) {
        if (this.#player.isHuman) {
            this.#playerItemVM.status = status;
        }
        else {
            this.#cpuModel.status = status;
        }
    }

    #flowEndCleanUp() {
        this.#battleFieldVM.cards = [];
        this.#allPlayerList.map(p => p.forcePass = false);

        if (this.#playerItemVM.status !== PlayerStatus.GameOver) {
            this.#playerItemVM.status = PlayerStatus.NONE;
        }
        this.#cpuListVM.cpuModelList.forEach(c => {
            if (c.status !== PlayerStatus.GameOver) {
                c.status = PlayerStatus.NONE;
            }
        });
    }
}
