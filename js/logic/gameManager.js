
class GameManager {
    #currentPlayer = null;
    playerCardsVM = null;
    cpuListVM = null;
    battleFieldVM = null;
    
    constructor(playerChain) {
        this.#currentPlayer = playerChain;
    }

    setStart() {
        console.log("【セット開始】");
        this.#gameStart();
    }

    async #gameStart() {
        console.log("【ゲーム開始】");

        // 1位と最下位でカードの交換を行う。
        const players = this.#currentPlayer.allPlayerList;
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];

        let scene = new ExchangeCardsScene(this, firstPlacePlayer, lastPlacePlayer);

        while (scene !== null) {
            scene = await scene.start();
        }
    }
}
