
const viewModel = {
    data() {
        return {
            gameManager: null
        }
    },
    created() {
        this.gameManager = new GameManager();
    }
};

Vue.createApp(viewModel).mount("#app");
