
class GameManager {
    #player = null;
    get player() {
        return this.#player;
    }
    playerItemVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    #ranking = 1;
    
    constructor(cpuNum) {
        this.#player = PlayerFactory.createPlayerChain(cpuNum);
    }

    setStart() {
        console.log("【セット開始】");

        this.#gameStart();    
    }

    async #gameStart(isFirstGame = true) {
        let scene = new GameStartScene(this, isFirstGame);

        while (scene !== null) {
            scene = await scene.start();
        }

        this.#nextRanking = 0;
    }

    async nextGameStart() {
        this.#gameStart(false);
    }

    ranking(player) {
        player.nextRanking = this.#ranking++;
    }
}
