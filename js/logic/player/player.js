
class Player extends AbstractPlayer {
    #resolveSelectExchangeCards = null;

    async selectExchangeCards() {
        // TODO 最下位の場合は最も強いカードを交換する。
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
