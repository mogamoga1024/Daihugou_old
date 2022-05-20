
/**
 * 役
 */
class Hand {
    static None = new Hand();
    static Single = new Hand();
    static Zorome = new Hand();
    static Kaidan = new Hand();

    static CardsToHand(cards) {
        // TODO Joker

        if (cards.length === 0) {
            return this.None;
        }
        if (cards.length === 1) {
            return this.Single;
        }
        if (cards.filter(c => c.power === cards[0].power).length === cards.length) {
            return this.Zorome;
        }

        let preCard = cards[0];
        for (let i = 1; i < cards.length; i++) {
            const card = cards[i];
            if (card.suit !== preCard.suit || card.power - preCard.power !== 1) {
                return this.None;
            }
        }
        return this.Kaidan;
    }
}
