
class AbstractPlayer {
    cards = [];
    nextPlayer = null;
    prevPlayer = null;
    ranking = 0; // 1位なら1、2位なら2、…

    get allPlayerCount() {
        let currentPlayer = this;
        let count = 0;
        do {
            count++;
            currentPlayer = currentPlayer.nextPlayer;
        }
        while (currentPlayer !== this);
        return count;
    }

    get allPlayerList() {
        const ary = [];
        let currentPlayer = this;
        do {
            ary.push(currentPlayer);
            currentPlayer = currentPlayer.nextPlayer;
        }
        while (currentPlayer !== this);
        
        return ary;
    }

    get rank() {
        const lastRanking = this.allPlayerCount;
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

    /**
     * 交換するカードを選択する。
     * @returns {Array<Card>} 交換するカード
     */
    selectExchangeCards() {
        return [];
    }

    /**
     * 場にカードを出す。
     * 副作用で出したカードは手札からなくなる。
     * @returns {Array<Card>} 場に出すカード
     */
    pullOutCards() {
        return [];
    }
}
