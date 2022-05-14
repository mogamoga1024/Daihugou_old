
class Common {
    /**
     * @param {number} max 
     * @returns 0以上max未満のランダムな整数
     */
    static randomInt(max) {
        return crypto.getRandomValues(new Uint32Array(1))[0] % max;
    }

    static sortCards(cards) {
        return cards.sort((a, b) => {
            if (a.power !== b.power) {
                return a.power - b.power;
            }
            return a.mark - b.mark;
        })
    }
}
