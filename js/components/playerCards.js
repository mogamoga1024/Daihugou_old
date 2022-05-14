
const PlayerCards = {
    template: `
        <button @click="outputCards" :disabled="canOutputCards === false">交換</button>
        <button :disabled="isExchangeCardsScene">パス</button>
        <div id="player-card-container">
            <div class="player-card" v-for="card in playerCards"
                @click="onClickCard(card)"
                :class="{'selected-card': card.isSelected, 'disable-card': card.isSelected === false && canSelectCards === false}">
                {{ card.card.name }}
            </div>
        </div>
    `,
    data() {
        return {
            isExchangeCardsScene: true,
            playerCards: [],
            canSelectCards: true,
            canOutputCards: false,
        }
    },
    created() {
        gameManager.playerCardsVM = this;
        this.playerCards = player.cards.map(c => {
            return new CardModel(c)
        });
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
            player.selectExchangeCardsInScreen(this.playerCards.filter(c => c.isSelected).map(c => c.card));
            this.canSelectCards = true;
            this.canOutputCards = false;
            this.playerCards.map(c => c.isSelected = false);
        }
    }
};
