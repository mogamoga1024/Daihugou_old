
class Scene {
    #gameManager = null;
    get gameManager() {
        return this.#gameManager;
    }
    #player = null;
    get player() {
        return this.#player;
    }

    constructor(gameManager) {
        this.#gameManager = gameManager;
        this.#player = gameManager.player;
    }

    /**
     * @returns {Scene} 次のシーン
     */
    start() {
        return null;
    }
}
