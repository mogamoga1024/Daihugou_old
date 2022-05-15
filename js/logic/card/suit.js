
class Suit extends IDAble {
    static None = new Suit(0);
    static Spade = new Suit(1);
    static Heart = new Suit(2, true);
    static Diamond = new Suit(3, true);
    static Club = new Suit(4);

    power = 0;
    isRed = false;
    constructor(power, isRed = false) {
        super();
        this.power = power;
        this.isRed = isRed;
    }
}
