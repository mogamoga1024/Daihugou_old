
class Cpu extends AbstractPlayer {
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

    pullOutCards() {
        // TODO 選択するカードの判定

        const selectedCards = [this.cards[0]];

        this.cards = this.cards.filter(c => selectedCards.indexOf(c) === -1);

        return selectedCards;
    }
}
