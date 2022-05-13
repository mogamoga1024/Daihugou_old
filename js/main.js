
(function() {
    const cpuNum = 3;
    const playerChain = PlayerFactory.createPlayerChain(cpuNum);
    const gameManager = new GameManager(playerChain);

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
        }
    };

    Vue.createApp(viewModel).mount("#app");
})();
