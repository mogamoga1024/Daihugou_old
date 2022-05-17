
class GameManager {
    player = null;
    playerItemVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    
    constructor(cpuNum) {
        this.player = PlayerFactory.createPlayerChain(cpuNum);
    }

    async setStart() {
        console.log("【セット開始】");

        let scene = new GameStartScene(this, true);

        while (scene !== null) {
            scene = await scene.start();
        }
    }
}
