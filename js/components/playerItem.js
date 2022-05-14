
const PlayerItem = {
    template: `
        <div id="player-button-container">
            <button @click="outputCards" :disabled="canOutputCards === false">{{ outputCardsButtonText }}</button>
            <button :disabled="isExchangeCardsScene">パス</button>
        </div>
        <div id="player-card-container">
            <div class="player-card" v-for="card in playerCardModels"
                @click="onClickCard(card)"
                :class="{'selected-card': card.isSelected, 'disable-card': card.isSelected === false && canSelectCards === false}">
                {{ card.card.name }}
            </div>
        </div>
    `,
    data() {
        return {
            isExchangeCardsScene: true,
            playerCardModels: [],
            canSelectCards: true,
            canOutputCards: false,
            forceCardUnselectable: false,
        }
    },
    created() {
        gameManager.playerCardsVM = this;
        this.playerCardModels = player.cards.map(c => {
            return new CardModel(c)
        });
    },
    computed: {
        outputCardsButtonText() {
            return this.isExchangeCardsScene ? "交換" : "出す"
        }
    },
    methods: {
        onClickCard(card) {
            if (this.isExchangeCardsScene) {
                this.selectExchangeCards(card);
            }
            else {
                // TODO
            }
        },
        selectExchangeCards(card) {
            if (this.canSelectCards === false && card.isSelected === false || this.forceCardUnselectable) {
                return;
            }
            card.isSelected = !card.isSelected;
            const selectedCardsCount = this.playerCardModels.filter(c => c.isSelected).length;
            this.canSelectCards = selectedCardsCount < 2; // TODO 2
            this.canOutputCards = selectedCardsCount === 2; // TODO 2
        },
        outputCards() {
            this.exchangeCards();
        },
        exchangeCards() {
            player.selectExchangeCardsInScreen(this.playerCardModels.filter(c => c.isSelected).map(c => c.card));
            this.canSelectCards = true;
            this.canOutputCards = false;
            this.playerCardModels.map(c => c.isSelected = false);
        }
    }
};
