
const CpuList = {
    cpuList: [],
    template: `
        <div id="cpu-container">
            <div class="cpu" v-for="cpu in cpuModelList">{{ cpu.cardsCount }}</div>
        </div>
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