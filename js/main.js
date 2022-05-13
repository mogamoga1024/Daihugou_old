
const viewModel = {
    data() {
        return {
            gameManager: null,
            cpuNum: 3,
        }
    },
    created() {
        const playerChain = PlayerFactory.createPlayerChain(this.cpuNum);
        this.gameManager = new GameManager(playerChain);
    }
};

Vue.createApp(viewModel).mount("#app");
