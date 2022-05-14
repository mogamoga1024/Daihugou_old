
class Cpu extends AbstractPlayer {
    selectExchangeCards() {
        // 前提知識：this.cardsはカードの強さの昇順でソートされている。

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
