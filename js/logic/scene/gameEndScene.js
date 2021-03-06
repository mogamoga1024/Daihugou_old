
class GameEndScene extends Scene {
    #battleFieldVM = null;
    #playerItemVM = null;
    #cpuListVM = null;

    constructor(gameManager) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#playerItemVM = gameManager.playerItemVM;
        this.#cpuListVM = gameManager.cpuListVM;
    }

    start() {
        console.log("【ゲーム終了】");

        this.gameManager.players.forEach(p => {
            p.ranking = p.nextRanking;
            p.nextRanking = 0;
            p.forcePass = false;
            p.latestPullOutCard = Card.Null;
        });

        console.log("順位");
        this.gameManager.players.forEach(p => {
            console.log("name: " + p.name + ", ranking: " + p.ranking);
        });

        this.#playerItemVM.rank = this.gameManager.players[0].rank;
        this.#cpuListVM.updateCpuModelList();

        this.#battleFieldVM.inGame = false;
        this.#battleFieldVM.isFirstGame = false;

        return null;
    }
}
