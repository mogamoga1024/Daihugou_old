
class AbstractPlayer {
    cards = [];
    nextPlayer = null;
    prevPlayer = null;
    ranking = 0; // 1位なら1、2位なら2、…

    chainToArray() {
        const ary = [];
        let currentPlayer = this;
        do {
            ary.push(currentPlayer);
            currentPlayer = currentPlayer.nextPlayer;
        }
        while (currentPlayer !== this);
        
        return ary;
    }
}
