
class Scene {
    #gameManager = null;
    get gameManager() {
        return this.#gameManager;
    }
    constructor(gameManager) {
        this.#gameManager = gameManager;
    }

    /**
     * @returns {Scene} 次のシーン
     */
    start() {
        return null;
    }
}
