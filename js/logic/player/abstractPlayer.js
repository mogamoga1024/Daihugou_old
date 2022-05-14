
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

    /**
     * 交換するカードを選択する。
     * @returns {Array<Card>}
     */
    selectExchangeCards() {
        return [];
    }
}
