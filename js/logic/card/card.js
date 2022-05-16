
class Card extends IDAble {
    static Null = new Card(Suit.None, "Null", 0);

    static #allCards = [];
    static get allCards() {
        if (this.#allCards.length > 0) {
            return this.#allCards;
        }
        const suits = [Suit.Spade, Suit.Heart, Suit.Diamond, Suit.Club];
        for (const suit of suits) {
            this.#allCards.push(new Card(suit, "3",  1));
            this.#allCards.push(new Card(suit, "4",  2));
            this.#allCards.push(new Card(suit, "5",  3));
            this.#allCards.push(new Card(suit, "6",  4));
            this.#allCards.push(new Card(suit, "7",  5));
            this.#allCards.push(new Card(suit, "8",  6));
            this.#allCards.push(new Card(suit, "9",  7));
            this.#allCards.push(new Card(suit, "10", 8));
            this.#allCards.push(new Card(suit, "J",  9));
            this.#allCards.push(new Card(suit, "Q",  10));
            this.#allCards.push(new Card(suit, "K",  11));
            this.#allCards.push(new Card(suit, "1",  12));
            this.#allCards.push(new Card(suit, "2",  13));
        }
        this.#allCards.push(new Card(Suit.None, "Joker",  14));
        this.#allCards.push(new Card(Suit.None, "Joker",  14));
        return this.#allCards;
    }

    _suit = Suit.None;
    get suit() {
        return this._suit;
    }

    _numberName = "none";

    _name = "";
    get name() {
        if (this._name === "") {
            switch (this._suit.id) {
                case Suit.Spade.id:   this._name = "♠" + this._numberName; break;
                case Suit.Heart.id:   this._name = "♥" + this._numberName; break;
                case Suit.Diamond.id: this._name = "♦" + this._numberName; break;
                case Suit.Club.id:    this._name = "♣" + this._numberName; break;
                case Suit.None.id:    this._name = this._numberName; break;
            }
        }
        return this._name;
    }

    _power = Number.MIN_SAFE_INTEGER;
    get power() {
        return this._power;
    }

    constructor(suit, numberName, power) {
        super();
        this._suit = suit;
        this._numberName = numberName;
        this._power = power;
    }
}
