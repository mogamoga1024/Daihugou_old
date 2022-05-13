
class Player extends AbstractPlayer {
    #resolveChooseExchangeCards = null;

    async chooseExchangeCards() {
        return await this.#waitChooseExchangeCardsInScreen();
    }

    #waitChooseExchangeCardsInScreen() {
        return new Promise(resolve => {
            this.#resolveChooseExchangeCards = resolve;
        });
    }

    chooseExchangeCardsInScreen(cards) {
        if (this.#resolveChooseExchangeCards !== null) {
            this.#resolveChooseExchangeCards(cards);
            this.#resolveChooseExchangeCards = null;
        }
    }
}
