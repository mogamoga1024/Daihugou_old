
class CpuModel {
    cardsCount = 0;
    ranking = 0;
    constructor(cpu) {
        this.cardsCount = cpu.cards.length;
        this.ranking = cpu.ranking;
    }
}
