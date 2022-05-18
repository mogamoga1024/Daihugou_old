
class Player extends AbstractPlayer {
    #resolveSelectExchangeCards = null;
    #resolvePullOutCards = null;
    name = "あなた";

    async selectExchangeCards() {
        return await this.#waitSelectExchangeCardsInScreen();
    }

    #waitSelectExchangeCardsInScreen() {
        return new Promise(resolve => {
            this.#resolveSelectExchangeCards = resolve;
        });
    }

    selectExchangeCardsInScreen(cards) {
        if (this.#resolveSelectExchangeCards !== null) {
            this.#resolveSelectExchangeCards(cards);
            this.#resolveSelectExchangeCards = null;
        }
    }

    pullOutCards() {
        return this.#waitPullOutCardsInScreen();
    }

    #waitPullOutCardsInScreen() {
        return new Promise(resolve => {
            this.#resolvePullOutCards = resolve;
        });
    }

    pullOutCardsInScreen(cards) {
        if (this.#resolvePullOutCards !== null) {
            this.cards = this.cards.filter(c => cards.filter(d => c.id === d.id).length === 0);
            this.latestPullOutCard = cards.length === 0 ? Card.Null : cards[0];
            
            this.#resolvePullOutCards(cards);
            this.#resolvePullOutCards = null;
        }
    }

    passInScreen() {
        this.#resolvePullOutCards([])
    }
}
