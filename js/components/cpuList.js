
const createCpuList = function(gameManager) {
    return {
        cpuList: [],
        template: `
            <div id="cpu-container">
                <template v-for="cpu in cpuModelList">
                    <div class="cpu">
                        <div class="cpu-status-container">
                            <div>{{ cpu.rank }}</div>
                            <div class="spacer"></div>
                            <div>
                                <span class="name" :class="{'current-turn': cpu.isTurn}">{{ cpu.name }}</span><!--
                                --><span :class="{'status': cpu.status !== ''}">{{ cpu.status }}</span>
                            </div>
                        </div>
                        <div class="cpu-cards-count">{{ cpu.cardsCount }}</div>
                    </div>
                </template>
            </div>
        `,
        data() {
            return {
                cpuModelList: []
            }
        },
        created() {
            gameManager.cpuListVM = this;
            this.updateCpuModelList();
        },
        methods: {
            getCpuModel(id) {
                return this.cpuModelList.filter(c => c.id === id)[0];
            },
            updateCpuModelList() {
                [, ...this.cpuList] = gameManager.players;
                this.cpuModelList = this.cpuList.map(c => new CpuModel(c));
            }
        }
    };
};
