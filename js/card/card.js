
class Card {
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

    _mark = Mark.NONE;
    get mark() {
        return this._mark;
    }

    _numberName = "none";

    _name = "";
    get name() {
        if (this._name === "") {
            switch (this._mark) {
                case Mark.SPADE:   this._name = "♠" + this._numberName; break;
                case Mark.HEART:   this._name = "♥" + this._numberName; break;
                case Mark.DIAMOND: this._name = "♦" + this._numberName; break;
                case Mark.CLUB:    this._name = "♣" + this._numberName; break;
                case Mark.NONE:    this._name = this._numberName; break;
            }
        }
        return this._name;
    }

    #power = Number.MIN_SAFE_INTEGER;
    get power() {
        return this.#power;
    }

    constructor(mark, numberName, power) {
        this._mark = mark;
        this._numberName = numberName;
        this.#power = power;
    }
}
