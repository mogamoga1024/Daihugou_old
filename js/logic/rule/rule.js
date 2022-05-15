
class Rule {
    static canPullOutCards(battleFieldCards, selectedCards) {
        // TODO 「階段、縛り、革命、禁止あがり」は一旦考えない。

        if (selectedCards.length !== battleFieldCards.length) {
            // 場に出ているカードの枚数と異なれば出せない。
            return false;
        }
        if (selectedCards[0].power <= battleFieldCards[0].power) {
            // 場に出ているカード以下の強さなら出せない。
            return false;
        }

        return true;
    }

    /**
     * ・手札から場に出せるカードを探す。
     * ・手札は昇順でソートされていることが前提
     * @param {*} battleFieldCards 場のカード 
     * @param {*} cards 手札
     * @requires {Array<Card>} 場に出せるカード
     */
    static findCanPullOutCards(battleFieldCards, cards) {
        // TODO 「階段、縛り、革命、禁止あがり」は一旦考えない。

        if (battleFieldCards.length === 0) {
            return [...cards];
        }

        const strongCards = cards.filter(c => c.power > battleFieldCards[0]);
        if (strongCards.length === 0) {
            return [];
        }
        
        let tmpCards = [];
        let rtnCards = [];
        let currentPower = strongCards[0];
        for (let i = 0; i < strongCards.length; i++) {
            const card = strongCards[i];
            const isSamePower = card.power === currentPower;
            if (isSamePower) {
                tmpCards.push(card);
            }
            if (isSamePower === false || i === strongCards.length - 1) {
                if (tmpCards.length === battleFieldCards.length) {
                    rtnCards = rtnCards.concat(tmpCards);
                }
                currentPower = card.power;
                tmpCards = [];
            }
        }

        return rtnCards;
    }
}
