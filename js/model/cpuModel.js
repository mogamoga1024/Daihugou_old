
class CpuModel {
    id = 0;
    cardsCount = 0;
    ranking = 0;
    constructor(cpu) {
        this.id = cpu.id;
        this.cardsCount = cpu.cards.length;
        this.ranking = cpu.ranking;
    }
}
