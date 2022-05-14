
const cpuNum = 3;
const player = PlayerFactory.createPlayerChain(cpuNum);
const gameManager = new GameManager(player);

const viewModel = {
    components: {
        PlayerItem,
        CpuList
    },
    data() {
        return {
            cards: []
        }
    },
    created() {
        gameManager.battleFieldVM = this;
    },
    mounted() {
        gameManager.setStart();
    },
    methods: {
        
    }
};

Vue.createApp(viewModel).mount("#app");
