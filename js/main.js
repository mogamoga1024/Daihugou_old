
(function() {
    const cpuNum = 3;
    const gameManager = new GameManager(cpuNum);

    const PlayerItem = createPlayerItem(gameManager);
    const CpuList = createCpuList(gameManager);

    const App = {
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
            },
            nextGameStart() {
                gameManager.nextGameStart();
            }
        }
    };

    Vue.createApp(App).mount("#app");
})();
