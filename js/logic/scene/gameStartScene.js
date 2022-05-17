
class GameStartScene extends Scene {
    #battleFieldVM = null;
    #isFirstGame = false;
    #player = null;

    constructor(gameManager, isFirstGame) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.isFirstGame = isFirstGame;
        this.#player = gameManager.player;
    }

    start() {
        console.log("【ゲーム開始】");

        this.#battleFieldVM.inGame = true;
        this.#battleFieldVM.isFirstGame = this.#isFirstGame;

        // 1位と最下位でカードの交換を行う。
        const players = this.#player.allPlayerList;
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];

        console.log("各プレイヤーの手札");
        players.forEach(p => {
            console.log("ranking: " + p.ranking + ", cards: " + Common.cardListToString(p.cards));
        });

        return new ExchangeCardsScene(this.gameManager, firstPlacePlayer, lastPlacePlayer);
    }
}
