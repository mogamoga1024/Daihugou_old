
class GameEndScene extends Scene {
    #battleFieldVM = null;

    constructor(gameManager, isFirstGame = true) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#battleFieldVM.isFirstGame = isFirstGame;
    }

    start() {
        console.log("【ゲーム終了】");

        this.#battleFieldVM.inGame = false;

        return null;
    }
}
