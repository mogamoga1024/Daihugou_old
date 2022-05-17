
class GameStartScene extends Scene {
    #battleFieldVM = null;
    #playerItemVM = null;
    #isFirstGame = false;

    constructor(gameManager, isFirstGame) {
        super(gameManager);
        this.#battleFieldVM = gameManager.battleFieldVM;
        this.#playerItemVM = gameManager.playerItemVM;
        this.#isFirstGame = isFirstGame;
    }

    start() {
        console.log("【ゲーム開始】");

        this.#battleFieldVM.inGame = true;
        this.#battleFieldVM.isFirstGame = this.#isFirstGame;

        // カードを配る。
        if (this.#isFirstGame === false) {
            PlayerFactory.dealCards(this.player);
            this.#playerItemVM.setPlayerCardModels(this.player.cards);
        }

        // 1位と最下位でカードの交換を行う。
        const players = this.player.allPlayerList;
        const firstPlacePlayer = players.filter(p => p.ranking === 1)[0];
        const lastPlacePlayer = players.filter(p => p.ranking === players.length)[0];

        console.log("各プレイヤーの手札");
        players.forEach(p => {
            console.log("ranking: " + p.ranking + ", cards: " + Common.cardListToString(p.cards));
        });

        return new ExchangeCardsScene(this.gameManager, firstPlacePlayer, lastPlacePlayer);
    }
}
