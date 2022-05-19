
class GameManager {
    playerItemVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    #ranking = 1;

    #players = [];
    get players() {
        return this.#players;
    }
    
    constructor(cpuNum) {
        this.#players = PlayerFactory.createPlayers(cpuNum);
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

        this.#ranking = 1;
    }

    async nextGameStart() {
        this.#gameStart(false);
    }

    ranking(player) {
        player.nextRanking = this.#ranking++;
    }
}
