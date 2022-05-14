
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
        // 前提知識：this.cardsはカードの強さの昇順でソートされている。

        // TODO 交換枚数

        if (this.ranking <= this.allPlayerCount / 2) {
            // TODO とりあえず単純に弱いカードを交換する。
            return [this.cards[0], this.cards[1]]
        }
        else {
            const cardsCount = this.cards.length;
            return [this.cards[cardsCount - 2], this.cards[cardsCount - 1]];
        }
    }
}
