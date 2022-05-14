
class Player extends AbstractPlayer {
    #resolveSelectExchangeCards = null;

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
}
