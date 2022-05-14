
class Player extends AbstractPlayer {
    #resolveSelectExchangeCards = null;

    async selectExchangeCards() {
        if (this.ranking <= this.allPlayerCount / 2) {
            return await this.#waitSelectExchangeCardsInScreen();
        }
        else {
            return super.selectExchangeCards();
        }
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
