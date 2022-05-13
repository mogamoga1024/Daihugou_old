
(function() {
    const cpuNum = 3;
    const player = PlayerFactory.createPlayerChain(cpuNum);
    const gameManager = new GameManager(player);

    const viewModel = {
        data() {
            return {
                playerCards: [],
                canChooseCards: true,
                canExchangeCards: false,
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
            chooseExchangeCards(card) {
                if (this.canChooseCards === false && card.isSelected === false) {
                    return;
                }
                card.isSelected = !card.isSelected;
                const selectedCardsCount = this.playerCards.filter(c => c.isSelected).length;
                this.canChooseCards = selectedCardsCount < 2; // TODO 2
                this.canExchangeCards = selectedCardsCount === 2; // TODO 2
            },
            exchangeCards() {
                player.chooseExchangeCardsInScreen(this.playerCards.filter(c => c.isSelected).map(c => c.origin));
                this.canChooseCards = true;
                this.canExchangeCards = false;
                this.playerCards.map(c => c.isSelected = false);
            }
        }
    };

    Vue.createApp(viewModel).mount("#app");
})();
