
(function() {
    const cpuNum = 3;
    const player = PlayerFactory.createPlayerChain(cpuNum);
    const gameManager = new GameManager(player);

    const viewModel = {
        data() {
            return {
                playerCards: []
            }
        },
        created() {
            this.playerCards = player.cards.map(c => {
                return {origin: c, isSelected: false}
            });
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
