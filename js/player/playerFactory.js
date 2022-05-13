
class PlayerFactory {
    static #minCpuNum = 1;
    static #maxCpuNum = 3;

    static createPlayerChain(cpuNum) {
        if (cpuNum < this.#minCpuNum || cpuNum > this.#maxCpuNum) {
            throw new Error("CPUの人数が範囲外です。");
        }

        const firstPlayer = new Player();
        let currentPlayer = firstPlayer;
        for (let i = 0; i < cpuNum; i++) {
            let nextPlayer = new Cpu();
            currentPlayer.nextPlayer = nextPlayer;
            nextPlayer.prevPlayer = currentPlayer;
            currentPlayer = nextPlayer;
        }
        currentPlayer.nextPlayer = firstPlayer;
        firstPlayer.prevPlayer = currentPlayer;

        this.dealCards(firstPlayer);

        return firstPlayer;
    }

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
            currentPlayer = currentPlayer.nextPlayer;
        }
    }
}
