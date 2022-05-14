
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
            
        }
    },
    created() {
        
    },
    mounted() {
        gameManager.gameStart();
    },
    methods: {
        
    }
};

Vue.createApp(viewModel).mount("#app");
