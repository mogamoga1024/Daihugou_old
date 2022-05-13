
(function() {
    const cpuNum = 3;
    const player = PlayerFactory.createPlayerChain(cpuNum);
    const gameManager = new GameManager(player);

    const viewModel = {
        data() {
            return {
                playerCards: [],
                canChooseCard: true,
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
                if (this.canChooseCard === false && card.isSelected === false) {
                    return;
                }
                card.isSelected = !card.isSelected;
                this.canChooseCard = this.playerCards.filter(c => c.isSelected).length < 2; // TODO 2
            },
            exchangeCards() {
                player.chooseExchangeCardsInScreen([player.cards[0]]);
            }
        }
    };

    Vue.createApp(viewModel).mount("#app");
})();
