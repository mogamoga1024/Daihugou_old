
class CpuModel {
    id = 0;
    name = "";
    status = "";
    cardsCount = 0;
    ranking = 0;

    constructor(cpu) {
        this.id = cpu.id;
        this.name = cpu.name;
        this.status = "";
        this.cardsCount = cpu.cards.length;
        this.ranking = cpu.ranking;
    }
}
