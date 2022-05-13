
class Card {
    _mark = Mark.NONE;
    _numberName = "none";
    #power = Number.MIN_SAFE_INTEGER;
    static #allCards = [];

    static get allCards() {
        if (this.#allCards.length > 0) {
            return this.#allCards;
        }
        const marks = [Mark.SPADE, Mark.HEART, Mark.DIAMOND, Mark.CLUB];
        for (const mark of marks) {
            this.#allCards.push(new Card(mark, "3",  1));
            this.#allCards.push(new Card(mark, "4",  2));
            this.#allCards.push(new Card(mark, "5",  3));
            this.#allCards.push(new Card(mark, "6",  4));
            this.#allCards.push(new Card(mark, "7",  5));
            this.#allCards.push(new Card(mark, "8",  6));
            this.#allCards.push(new Card(mark, "9",  7));
            this.#allCards.push(new Card(mark, "10", 8));
            this.#allCards.push(new Card(mark, "J",  9));
            this.#allCards.push(new Card(mark, "Q",  10));
            this.#allCards.push(new Card(mark, "K",  11));
            this.#allCards.push(new Card(mark, "1",  12));
            this.#allCards.push(new Card(mark, "2",  13));
        }
        this.#allCards.push(new Card(Mark.NONE, "Joker",  14));
        this.#allCards.push(new Card(Mark.NONE, "Joker",  14));
        return this.#allCards;
    }

    constructor(mark, numberName, power) {
        this._mark = mark;
        this._numberName = numberName;
        this.#power = power;
    }

    toString() {
        switch (this._mark) {
            case Mark.SPADE:   return "♠" + this._numberName;
            case Mark.HEART:   return "♥" + this._numberName;
            case Mark.DIAMOND: return "♦" + this._numberName;
            case Mark.CLUB:    return "♣" + this._numberName;
            case Mark.NONE:    return this._numberName;
        } 
    }
}
