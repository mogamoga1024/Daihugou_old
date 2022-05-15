
class Common {
    /**
     * @param {number} max 
     * @returns 0以上max未満のランダムな整数
     */
    static randomInt(max) {
        return crypto.getRandomValues(new Uint32Array(1))[0] % max;
    }

    /**
     * @param {*} time スリープする時間（ミリ秒）
     * @returns {Promise}
     */
    static sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    /**
     * @param {Array<Card>} cards 
     * @returns {Array<Card>} ソートされたカード
     */
    static sortCards(cards) {
        return cards.sort((a, b) => {
            if (a.power !== b.power) {
                return a.power - b.power;
            }
            return a.suit.power - b.suit.power;
        })
    }

    static cardListToString(cardList) {
        const str = cardList.map(c => c.name).join(", ");
        return str === "" ? "ない" : str;
    }
}
