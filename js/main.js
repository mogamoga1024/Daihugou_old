
(function() {
    const cpuNum = 3;
    const player = PlayerFactory.createPlayerChain(cpuNum);
    let gameManager = null;

    const viewModel = {
        components: {
            PlayerCards
        },
        data() {
            return {
                playerCards: [],
                canSelectCards: true,
                canOutputCards: false,
            }
        },
        created() {
            gameManager = new GameManager(this, player);

            this.playerCards = player.cards.map(c => {
                return {origin: c, isSelected: false}
            });
        },
        mounted() {
            gameManager.gameStart();
        },
        methods: {
            onClickCard(card) {
                this.selectExchangeCards(card);
            },
            selectExchangeCards(card) {
                if (this.canSelectCards === false && card.isSelected === false) {
                    return;
                }
                card.isSelected = !card.isSelected;
                const selectedCardsCount = this.playerCards.filter(c => c.isSelected).length;
                this.canSelectCards = selectedCardsCount < 2; // TODO 2
                this.canOutputCards = selectedCardsCount === 2; // TODO 2
            },
            outputCards() {
                this.exchangeCards();
            },
            exchangeCards() {
                player.selectExchangeCardsInScreen(this.playerCards.filter(c => c.isSelected).map(c => c.origin));
                this.canSelectCards = true;
                this.canOutputCards = false;
                this.playerCards.map(c => c.isSelected = false);
            },
            onUpdatePlayerCards(newCards) {
                this.playerCards = newCards.map(c => {
                    return {origin: c, isSelected: false}
                });
            }
        }
    };

    Vue.createApp(viewModel).mount("#app");
})();
