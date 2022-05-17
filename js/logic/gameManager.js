
class GameManager {
    player = null;
    playerCardsVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    
    constructor(cpuNum) {
        this.player = PlayerFactory.createPlayerChain(cpuNum);
    }

    async setStart() {
        console.log("【セット開始】");

        let scene = new GameStartScene(this);

        while (scene !== null) {
            scene = await scene.start();
        }
    }
}
