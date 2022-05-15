
const PlayerItem = {
    template: `
        <div id="player-button-container">
            <button @click="outputCards" :disabled="canOutputCards === false">{{ outputCardsButtonText }}</button>
            <button :disabled="isExchangeCardsScene">パス</button>
        </div>
        <div id="player-card-container">
            <div class="player-card" v-for="card in playerCardModels"
                @click="onCardClick(card)"
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
        }
    },
    created() {
        gameManager.playerCardsVM = this;
        this.playerCardModels = Common.cardListToPlayerCardModelList(player.cards);
    },
    computed: {
        outputCardsButtonText() {
            return this.isExchangeCardsScene ? "交換" : "出す"
        }
    },
    methods: {
        // ↓ 画面に紐づいているメソッド

        onCardClick(card) {
            if (this.isExchangeCardsScene) {
                this.selectExchangeCards(card);
            }
            else {
                this.selectPullOutCards(card);
            }
        },
        outputCards() {
            if (this.isExchangeCardsScene) { // TODO SceneStatus
                this.exchangeCards();
            }
            else {
                this.pullOutCards();
            }
        },

        // ↓ 画面に紐づいていないメソッド

        resetCardsStatus() {
            this.canSelectCards = true;
            this.canOutputCards = false;
            this.playerCardModels.map(c => c.isSelected = false);
        },
        selectExchangeCards(card) {
            if (player.rank === Rank.Hinmin || player.rank === Rank.Daihinmin) {
                return;
            }
            card.isSelected = !card.isSelected;
            const selectedCardsCount = this.playerCardModels.filter(c => c.isSelected).length;
            this.canSelectCards = selectedCardsCount < 2; // TODO 2
            this.canOutputCards = selectedCardsCount === 2; // TODO 2
        },
        exchangeCards() {
            player.selectExchangeCardsInScreen(this.playerCardModels.filter(c => c.isSelected).map(c => c.card));
            this.resetCardsStatus();
        },
        selectPullOutCards(card) {
            card.isSelected = !card.isSelected;
            this.canOutputCards = true;
        },
        pullOutCards() {
            player.pullOutCardsInScreen(this.playerCardModels.filter(c => c.isSelected).map(c => c.card));
            this.resetCardsStatus();
            // todo
        }
    }
};
