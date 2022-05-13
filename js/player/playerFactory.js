
class PlayerFactory {
    static #minCpuNum = 1;
    static #maxCpuNum = 3;

    /**
     * ・nextPlayer, prevPlayerがセットされた状態でPlayerオブジェクトを生成する。
     * ・引数のcpuNumだけCpuオブジェクトが生成されnextPlayer,prevPlayerに紐づけられる。
     * ・Playerオブジェクトは最下位で生成される。
     * ・カードも配られた状態で生成される。
     * @param {number} cpuNum 
     * @returns {Player}
     */
    static createPlayerChain(cpuNum) {
        if (cpuNum < this.#minCpuNum || cpuNum > this.#maxCpuNum) {
            throw new Error("CPUの人数が範囲外です。");
        }

        const firstPlayer = new Player();
        let currentPlayer = firstPlayer;
        currentPlayer.ranking = cpuNum + 1;
        for (let i = 0; i < cpuNum; i++) {
            let nextPlayer = new Cpu();
            currentPlayer.nextPlayer = nextPlayer;
            nextPlayer.prevPlayer = currentPlayer;
            nextPlayer.ranking = currentPlayer.ranking - 1;
            currentPlayer = nextPlayer;
        }
        currentPlayer.nextPlayer = firstPlayer;
        firstPlayer.prevPlayer = currentPlayer;

        this.dealCards(firstPlayer);

        return firstPlayer;
    }

    /**
     * カードを配る。
     * @param {Player|Cpu} playerChain 
     */
    static dealCards(playerChain) {
        const firstPlayer = playerChain;
        let currentPlayer = firstPlayer;
        do {
            currentPlayer.cards = [];
            currentPlayer = currentPlayer.nextPlayer;
        }
        while (currentPlayer !== firstPlayer);

        const cardsIndexs = [];
        for (let i = 0; i < Card.allCards.length; i++) {
            cardsIndexs.push(i);
        }
        for (let i = 0; i < cardsIndexs.length; i++) {
            const j = Common.randomInt(cardsIndexs.length);
            const tmpIndex = cardsIndexs[i];
            cardsIndexs[i] = cardsIndexs[j];
            cardsIndexs[j] = tmpIndex;
        }

        for (const index of cardsIndexs) {
            currentPlayer.cards.push(Card.allCards[index]);
            this.#sortCards(currentPlayer.cards);
            currentPlayer = currentPlayer.nextPlayer;
        }
    }

    static #sortCards(cards) {
        return cards.sort((a, b) => {
            if (a.power !== b.power) {
                return a.power - b.power;
            }
            return a.mark - b.mark;
        })
    }
}
