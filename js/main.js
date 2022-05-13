
(function() {
    const cpuNum = 3;
    const player = PlayerFactory.createPlayerChain(cpuNum);
    const gameManager = new GameManager(player);

    const viewModel = {
        data() {
            return {
                text: "Hello, World!",
            }
        },
        created() {
            
        },
        mounted() {
            gameManager.gameStart();
        },
        methods: {
            chooseExchangeCards() {
                player.chooseExchangeCardsInScreen([player.cards[0]]);
            }
        }
    };

    Vue.createApp(viewModel).mount("#app");
})();
