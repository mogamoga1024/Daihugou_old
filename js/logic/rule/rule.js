
class Rule {
    /**
     * いるかなあ このメソッド
     * @param {*} battleFieldCards 
     * @param {*} selectedCards 
     * @returns 
     */
    static canPullOutCards(battleFieldCards, selectedCards) {
        // TODO 「階段、縛り、革命、禁止あがり、Joker」は一旦考えない。

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
     * ・Playerが使うことを想定
     * @param {Array<Card>} battleFieldCards 場のカード 
     * @param {Array<Card>} cards 手札
     * @returns {Array<Card>} 場に出せるカード
     */
    static findSelectableCards(battleFieldCards, cards) {
        // TODO 「縛り、革命、禁止あがり、Joker」は一旦考えない。

        if (battleFieldCards.length === 0) {
            return [...cards];
        }

        const strongCards = cards.filter(c => c.power > battleFieldCards[0].power);
        if (strongCards.length === 0) {
            return [];
        }

        const bfHand = Hand.CardsToHand(battleFieldCards);
        
        let selectableCards = [];

        if (bfHand === Hand.Single || bfHand === Hand.Zorome) {
            let tmpCards = [];
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
        }
        else if (bfHand === Hand.Kaidan) {
            const cardsMap = new Map();
            cardsMap.set(Suit.Spade, []);
            cardsMap.set(Suit.Heart, []);
            cardsMap.set(Suit.Diamond, []);
            cardsMap.set(Suit.Club, []);

            for (const card of strongCards) {
                const suitCards = cardsMap.get(card.suit);
                if (suitCards.length === 0 || card.power - suitCards[suitCards.length - 1].card.power === 1) {
                    suitCards.push(card);
                }
            }

            for (const suitCards of cardsMap.values()) {
                if (suitCards.length >= battleFieldCards.length) {
                    selectableCards = selectableCards.concat(suitCards);
                }
            }
        }

        return selectableCards;
    }

    /**
     * ・選択されているカードと残りのカードから選択可能なカードを探す。
     * ・Playerが使うことを想定
     * @param {*} battleFieldCards 
     * @param {*} selectableCards 
     * @param {*} selectedCards 
     * @returns 
     */
    static findSelectableRemainingCards(battleFieldCards, selectableCards, selectedCards) {
        // TODO 「階段、縛り、革命、禁止あがり、Joker」は一旦考えない。

        if (selectedCards.length === 0) {
            throw new Error(this.findSelectableCards.name + "を利用してください。");
        }
        if (selectableCards.length === battleFieldCards.length) {
            return [...selectableCards];
        }
        if (selectedCards.length === battleFieldCards.length) {
            return [...selectedCards];
        }
        
        const power = selectedCards[0].power;
        return selectableCards.filter(c => c.power === power);
    }

    /**
     * ・手札から出せる手役一覧
     * ・CPUが使うことを想定
     * @param {*} battleFieldCards 
     * @param {*} cards 
     * @returns 
     */
    static findSelectableHands(battleFieldCards, cards) {
        // TODO 「階段、縛り、革命、禁止あがり、Joker」は一旦考えない。

        if (battleFieldCards.length === 0) {
            // TODO 仮
            return cards.map(c => [c]);
        }

        const strongCards = cards.filter(c => c.power > battleFieldCards[0].power);
        if (strongCards.length === 0) {
            return [];
        }

        const minPower = strongCards[0].power;
        const maxPower = strongCards[strongCards.length - 1].power;
        const selectableHands = [];
        for (let power = minPower; power <= maxPower; power++) {
            const cards = strongCards.filter(c => c.power === power);
            if (cards.length >= battleFieldCards.length) {
                // TODO テキトー
                selectableHands.push(cards.slice(0, battleFieldCards.length));
            }
        }

        return selectableHands;
    }
}
