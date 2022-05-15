
// const Suit = {
//     None:    {power: 0, isRed: false},
//     Spade:   {power: 1, isRed: false},
//     Heart:   {power: 2, isRed: true},
//     Diamond: {power: 3, isRed: true},
//     Club:    {power: 4, isRed: false},
// };

class Suit extends IDAble {
    static None = new Suit(0);
    static Spade = new Suit(1);
    static Heart = new Suit(2, true);
    static Diamond = new Suit(3, true);
    static Club = new Suit(4);

    power = 0;
    isRed = 0;
    constructor(power, isRed = false) {
        this.power = power;
        this.isRed = isRed;
    }
}

