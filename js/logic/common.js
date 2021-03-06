
class Common {
    /**
     * @param {number} max 
     * @returns 0以上max未満のランダムな整数
     */
    static randomInt(max) {
        return crypto.getRandomValues(new Uint32Array(1))[0] % max;
    }

    static #sleepTime = 600;

    /**
     * @param {number} time スリープする時間（ミリ秒）
     * @returns {Promise}
     */
    static sleep(time = this.#sleepTime) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    static sleepRate(rate) {
        return this.sleep(this.#sleepTime * rate);
    }

    static sleepCpuThink() {
        return this.sleep(1000);
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
        });
    }

    static cardListToString(cardList, needId = false) {
        let str = null;
        if (needId) {
            str = cardList.map(c => c.id + ":" + c.name).join(", ");
        }
        else {
            str = cardList.map(c => c.name).join(", ");
        }
        return str === "" ? "ない" : str;
    }
}
