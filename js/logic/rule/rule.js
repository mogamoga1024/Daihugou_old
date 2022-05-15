
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
     * @param {Array<Card>} battleFieldCards 場のカード 
     * @param {Array<Card>} cards 手札
     * @returns {Array<Card>} 場に出せるカード
     */
    static findSelectableCards(battleFieldCards, cards) {
        // TODO 「階段、縛り、革命、禁止あがり」は一旦考えない。

        if (battleFieldCards.length === 0) {
            return [...cards];
        }

        const strongCards = cards.filter(c => c.power > battleFieldCards[0].power);
        if (strongCards.length === 0) {
            return [];
        }
        
        let tmpCards = [];
        let selectableCards = [];
        let currentPower = strongCards[0].power;
        // ↓ 最後のカードの枚数が1枚の時に選択されない問題を解決するための暫定対応
        strongCards.push(new Card(Suit.None, "Dummy", Number.MAX_SAFE_INTEGER));
        for (let i = 0; i < strongCards.length; i++) {
            const card = strongCards[i];
            const isSamePower = card.power === currentPower;
            const isLastCard = i === strongCards.length - 1;
            if (isSamePower || tmpCards.length === 0) {
                tmpCards.push(card);
            }
            if (isSamePower === false || isLastCard) {
                if (tmpCards.length >= battleFieldCards.length) {
                    selectableCards = selectableCards.concat(tmpCards);
                }
                currentPower = card.power;
                tmpCards = [];
            }
            if (isSamePower === false && isLastCard == false) {
                tmpCards.push(card);
            }
        }

        return selectableCards;
    }
}
