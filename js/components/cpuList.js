
const createCpuList = function(gameManager) {
    return {
        cpuList: [],
        template: `
            <div id="cpu-container">
                <template v-for="cpu in cpuModelList">
                    <div class="cpu">
                        <div>
                            <span>{{ cpu.name }}</span><span :class="{'status': cpu.status !== ''}">{{ cpu.status }}</span>
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
