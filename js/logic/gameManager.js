
class GameManager {
    player = null;
    playerCardsVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    
    constructor(playerChain) {
        this.player = playerChain;
    }

    async setStart() {
        console.log("【セット開始】");

        let scene = new GameStartScene(this);

        while (scene !== null) {
            scene = await scene.start();
        }
    }
}
