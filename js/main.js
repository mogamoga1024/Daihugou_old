
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
            cards: [],
            inGame: false,
            isFirstGame: true,
        }
    },
    created() {
        gameManager.battleFieldVM = this;
    },
    mounted() {
        
    },
    methods: {
        setStart() {
            gameManager.setStart();
        }
    }
};

Vue.createApp(viewModel).mount("#app");
