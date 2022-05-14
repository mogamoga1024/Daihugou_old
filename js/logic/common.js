
class Common {
    /**
     * @param {number} max 
     * @returns 0以上max未満のランダムな整数
     */
    static randomInt(max) {
        return crypto.getRandomValues(new Uint32Array(1))[0] % max;
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
            return a.suit - b.suit;
        })
    }

    /**
     * @param {Player|Cpu} player
     * @returns {boolean} Playerオブジェクトかどうか
     */
    static isPlayer(player) {
        return player.constructor === Player;
    }
}
