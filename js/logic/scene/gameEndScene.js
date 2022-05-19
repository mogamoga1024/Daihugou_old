
class GameEndScene extends Scene {
    #battleFieldVM = null;

    constructor(gameManager) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
    }

    start() {
        console.log("【ゲーム終了】");

        // TODO nextRanking -> ranking

        this.#battleFieldVM.inGame = false;
        this.#battleFieldVM.isFirstGame = false;

        return null;
    }
}
