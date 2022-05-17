
const createCpuList = function(gameManager) {
    return {
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
            this.setCpuModelList(gameManager.player);
        },
        methods: {
            getCpuModel(id) {
                return this.cpuModelList.filter(c => c.id === id)[0];
            },
            setCpuModelList(player) {
                [, ...this.cpuList] = player.allPlayerList;
                this.cpuModelList = this.cpuList.map(c => new CpuModel(c));
            }
        }
    };
};
