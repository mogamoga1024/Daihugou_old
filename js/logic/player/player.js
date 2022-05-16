
class Player extends AbstractPlayer {
    #resolveSelectExchangeCards = null;
    #resolvePullOutCards = null;

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
            this.latestPullOutCardId = cards.length === 0 ? 0 : cards[0].id;
            
            this.#resolvePullOutCards(cards);
            this.#resolvePullOutCards = null;
        }
    }

    passInScreen() {
        this.#resolvePullOutCards([])
    }
}
