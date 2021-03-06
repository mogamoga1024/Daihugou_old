
class AbstractPlayer extends IDAble {
    name = "";
    cards = [];
    nextPlayer = null;
    prevPlayer = null;
    ranking = 0; // 1位なら1、2位なら2、…
    nextRanking = 0; // あがったときの順位
    forcePass = false;
    #playersCount = 0;

    /**
     * 最後に出した1枚目のカード
     * 場を流すかどうかの判定に利用する。
     */
    latestPullOutCard = Card.Null;
    
    get rank() {
        const lastRanking = this.#playersCount;
        switch (this.ranking) {
            case 1:
                return Rank.Daihugou;
            case 2:
                return Rank.Hugou;
            case lastRanking - 1:
                return Rank.Hinmin;
            case lastRanking:
                return Rank.Daihinmin;
            default:
                return Rank.Heimin;
        }
    }

    get isActive() {
        return this.cards.length !== 0;
    }

    get isGameOver() {
        return !this.isActive;
    }

    get nextActivePlayer() {
        let player = this;
        do {
            player = player.nextPlayer;
            if (player.isActive) {
                break;
            }
        }
        while (player !== this);

        return player;
    }

    get isHuman() {
        return true;
    }

    constructor(playersCount) {
        super();
        this.#playersCount = playersCount;
    }

    /**
     * 交換するカードを選択する。
     * @returns {Array<Card>} 交換するカード
     */
    selectExchangeCards() {
        return [];
    }

    /**
     * ・場にカードを出す。
     * ・副作用で出したカードは手札からなくなる。
     * ・パスする場合は空の配列を返す。（= 出すカードがないから）
     * @param {Array<Card>} battleFieldCards 今の場のカード 
     * @returns {Array<Card>} 場に出すカード
     */
    pullOutCards(battleFieldCards) {
        return [];
    }
}
