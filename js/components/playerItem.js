
const PlayerItem = {
    template: `
        <div id="player-button-container">
            <button @click="outputCards" :disabled="canOutputCards === false">{{ outputCardsButtonText }}</button>
            <button @click="pass" :disabled="canPass === false">パス</button>
        </div>
        <div id="player-card-container">
            <div class="player-card" v-for="card in playerCardModels"
                @click="onCardClick(card)"
                :class="{'selected-card': card.isSelected, 'disable-card': card.canSelect === false}">
                <span :class="{'red-card': card.card.suit.isRed}">{{ card.card.name }}</span>
            </div>
        </div>
    `,
    data() {
        return {
            isPlayerTurn: false,
            isExchangeCardsScene: true,
            playerCardModels: [],
            canOutputCards: false,
            canPass: false,
        }
    },
    created() {
        gameManager.playerCardsVM = this;
        this.playerCardModels = this.cardListToPlayerCardModelList(player.cards);
    },
    computed: {
        outputCardsButtonText() {
            return this.isExchangeCardsScene ? "交換" : "出す"
        }
    },
    methods: {
        // ↓ 画面に紐づいているメソッド

        onCardClick(card) {
            if (this.isPlayerTurn === false || card.canSelect === false) return;

            if (this.isExchangeCardsScene) {
                this.selectExchangeCards(card);
            }
            else {
                this.selectPullOutCards(card);
            }
        },
        outputCards() {
            if (this.isPlayerTurn === false) return;

            if (this.isExchangeCardsScene) { // TODO SceneStatus
                this.exchangeCards();
            }
            else {
                this.pullOutCards();
            }
        },
        pass() {
            if (this.isPlayerTurn === false) return;

            player.passInScreen();
            this.resetCardsStatus();
        },

        // ↓ 画面に紐づいていないメソッド

        resetCardsStatus() {
            this.canOutputCards = false;
            this.playerCardModels.map(c => {
                c.canSelect = true;
                c.isSelected = false;
            });
        },
        selectExchangeCards(card) {
            if (player.rank === Rank.Hinmin || player.rank === Rank.Daihinmin) {
                return;
            }
            card.isSelected = !card.isSelected;
            const selectedCardsCount = this.selectedPlayerCardModels().length;
            this.canOutputCards = selectedCardsCount === 2; // TODO 2 Magic Number
            if (this.canOutputCards) {
                this.playerCardModels.filter(c => c.isSelected === false).map(c => c.canSelect = false);
            }
            else {
                this.playerCardModels.map(c => c.canSelect = true);
            }
        },
        exchangeCards() {
            player.selectExchangeCardsInScreen(this.selectedPlayerCardModels().map(c => c.card));
            this.resetCardsStatus();
        },
        selectPullOutCards(card) {
            card.isSelected = !card.isSelected;
            this.canOutputCards = this.selectedPlayerCardModels().length > 0;
        },
        pullOutCards() {
            player.pullOutCardsInScreen(this.selectedPlayerCardModels().map(c => c.card));
            this.resetCardsStatus();
        },
        /**
         * Array<Card>をArray<PlayerCardModel>に変換する。
         * @param {Array<Card>} cardList
         * @returns {Array<PlayerCardModel>}
         */
        cardListToPlayerCardModelList(cardList) {
            return cardList.map(c => new PlayerCardModel(c));
        },
        selectedPlayerCardModels() {
            return this.playerCardModels.filter(c => c.isSelected);
        }
    }
};
