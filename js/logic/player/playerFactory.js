
class PlayerFactory {
    static #minCpuNum = 1;
    static #maxCpuNum = 3;

    /**
     * ・nextPlayer, prevPlayerがセットされた状態でPlayerオブジェクトとCpuオブジェクトの配列を生成する。
     * ・引数のcpuNumだけCpuオブジェクトが生成されnextPlayer,prevPlayerに紐づけられる。
     * ・Playerオブジェクトは最下位で生成される。
     * ・カードも配られた状態で生成される。
     * ・index:0はPlayerオブジェクト
     * @param {number} cpuNum 
     * @returns {Array<Player|Cpu>}
     */
    static createPlayers(cpuNum) {
        if (cpuNum < this.#minCpuNum || cpuNum > this.#maxCpuNum) {
            throw new Error("CPUの人数が範囲外です。");
        }

        const players = [];

        const playersCount = cpuNum + 1;
        const firstPlayer = new Player(playersCount);
        let player = firstPlayer;
        player.ranking = cpuNum + 1;
        players.push(player);
        
        for (let i = 0; i < cpuNum; i++) {
            let nextPlayer = new Cpu(playersCount);
            nextPlayer.name = "CPU" + (i + 1);
            player.nextPlayer = nextPlayer;
            nextPlayer.prevPlayer = player;
            nextPlayer.ranking = player.ranking - 1;
            player = nextPlayer;
            players.push(player);
        }
        player.nextPlayer = firstPlayer;
        firstPlayer.prevPlayer = player;

        this.dealCards(players);

        return players;
    }

    /**
     * カードを配る。
     * @param {Array<Player|Cpu>} players 
     */
    static dealCards(players) {
        players.forEach(p => p.cards = []);

        const cardsIndexs = [];
        for (let i = 0; i < Card.allCards.length; i++) {
            cardsIndexs.push(i);
        }

        // カードのシャッフル
        for (let i = 0; i < cardsIndexs.length; i++) {
            const j = Common.randomInt(cardsIndexs.length);
            const tmpIndex = cardsIndexs[i];
            cardsIndexs[i] = cardsIndexs[j];
            cardsIndexs[j] = tmpIndex;
        }

        let player = players[0];
        for (const index of cardsIndexs) {
            player.cards.push(Card.allCards[index]);
            Common.sortCards(player.cards);
            player = player.nextPlayer;
        }
    }
}
