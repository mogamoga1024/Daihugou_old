
class CpuModel {
    id = 0;
    name = "";
    status = PlayerStatus.NONE;
    cardsCount = 0;
    ranking = 0;
    isTurn = false;

    constructor(cpu) {
        this.id = cpu.id;
        this.name = cpu.name;
        this.cardsCount = cpu.cards.length;
        this.ranking = cpu.ranking;
    }
}
