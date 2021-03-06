
class GameStartScene extends Scene {
    #battleFieldVM = null;
    #playerItemVM = null;
    #cpuListVM = null;
    #isFirstGame = false;

    constructor(gameManager, isFirstGame) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#playerItemVM = gameManager.playerItemVM;
        this.#cpuListVM = gameManager.cpuListVM;
        this.#isFirstGame = isFirstGame;
    }

    start() {
        console.log("【ゲーム開始】");

        this.#playerItemVM.status = PlayerStatus.NONE;
        this.#cpuListVM.cpuModelList.forEach(c => {
            c.status = PlayerStatus.NONE;
        });

        this.#battleFieldVM.inGame = true;
        this.#battleFieldVM.isFirstGame = this.#isFirstGame;

        if (this.#isFirstGame === false) {
            // カードを配る。
            PlayerFactory.dealCards(this.gameManager.players);
            this.#playerItemVM.setPlayerCardModels(this.gameManager.players[0].cards);
            this.#cpuListVM.updateCpuModelList();
        }

        // 1位と最下位でカードの交換を行う。
        const players = this.gameManager.players;
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];

        console.log("各プレイヤーの手札");
        players.forEach(p => {
            console.log("name: " + p.name + ", cards: " + Common.cardListToString(p.cards));
        });

        return new ExchangeCardsScene(this.gameManager, firstPlacePlayer, lastPlacePlayer);
    }
}
