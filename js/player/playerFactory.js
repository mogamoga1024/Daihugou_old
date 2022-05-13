
class PlayerFactory {
    static #minCpuNum = 1;
    static #maxCpuNum = 3;

    static createPlayerChain(cpuNum) {
        if (cpuNum < this.#minCpuNum || cpuNum > this.#maxCpuNum) {
            throw new Error("CPUの人数が範囲外");
        }

        const firstPlayer = new Player();
        let currentPlayer = firstPlayer;
        for (let i = 0; i < cpuNum; i++) {
            let nextPlayer = new Cpu();
            currentPlayer.nextPlayer = nextPlayer;
            nextPlayer.prevPlayer = currentPlayer;
        }
        currentPlayer.nextPlayer = firstPlayer;
        firstPlayer.prevPlayer = currentPlayer;

        this.dealCards(firstPlayer);

        return firstPlayer;
    }

    static dealCards(playerChain) {

    }
}
