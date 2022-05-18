
class CpuModel {
    id = 0;
    name = "";
    status = "";
    cardsCount = 0;
    ranking = 0;

    get statusText() {
        return this.name + " " + this.status;
    }

    constructor(cpu) {
        this.id = cpu.id;
        this.name = cpu.name;
        this.status = "fugafuga";
        this.cardsCount = cpu.cards.length;
        this.ranking = cpu.ranking;
    }
}
