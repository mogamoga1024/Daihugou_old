
class GameManager {
    player = null;
    playerItemVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    
    constructor(cpuNum) {
        this.player = PlayerFactory.createPlayerChain(cpuNum);
    }

    setStart() {
        console.log("【セット開始】");

        this.#gameStart();    
    }

    async #gameStart() {
        let scene = new GameStartScene(this, true);

        while (scene !== null) {
            scene = await scene.start();
        }
    }

    async nextGameStart() {
        let scene = new GameStartScene(this, false);

        while (scene !== null) {
            scene = await scene.start();
        }
    }
}
