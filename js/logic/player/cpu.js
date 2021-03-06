
class Cpu extends AbstractPlayer {
    get isHuman() {
        return false;
    }

    async selectExchangeCards() {
        await Common.sleepCpuThink();

        // TODO 交換枚数

        if (this.rank === Rank.Daihugou) {
            // TODO とりあえず単純に弱いカードを交換する。
            return [this.cards[0], this.cards[1]]
        }
        else if (this.rank === Rank.Daihinmin) {
            const cardsCount = this.cards.length;
            return [this.cards[cardsCount - 2], this.cards[cardsCount - 1]];
        }
    }

    async pullOutCards(battleFieldCards) {
        await Common.sleepCpuThink();

        const selectableHands = this.forcePass ? [] : Rule.findSelectableHands(battleFieldCards, this.cards);

        if (selectableHands.length === 0) {
            this.latestPullOutCard = Card.Null;
            return [];
        }

        // TODO 適当
        const selectedCards = selectableHands[0];
        this.latestPullOutCard = selectedCards[0];

        this.cards = this.cards.filter(c => selectedCards.indexOf(c) === -1);

        return selectedCards;
    }
}
