
const cpuNum = 3;
const gameManager = new GameManager(cpuNum);

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
