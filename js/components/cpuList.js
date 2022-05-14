
const CpuList = {
    cpuList: [],
    template: `
        <div v-for="cpu in cpuModelList">{{ cpu.cardsCount }}</div>
    `,
    data() {
        return {
            cpuModelList: []
        }
    },
    created() {
        gameManager.cpuListVM = this;
        [, ...this.cpuList] = player.allPlayerList;
        this.cpuModelList = this.cpuList.map(c => new CpuModel(c));
    }
};
