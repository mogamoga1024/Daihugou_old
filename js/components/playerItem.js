
const createPlayerItem = function(gameManager) {
    return {
        template: `
            <div id="player-status-container">
                <span class="name" :class="{'current-turn': isPlayerTurn}">{{ name }}</span><!--
                --><span :class="{'status': status !== ''}">{{ status }}</span>
            </div>
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
        player: null,
        data() {
            return {
                name: "",
                status: "",
                rank: "",
                isPlayerTurn: false,
                isExchangeCardsScene: true,
                playerCardModels: [],
                canOutputCards: false,
                canPass: false,
            }
        },
        created() {
            gameManager.playerItemVM = this;
            this.player = gameManager.player;
            this.name = this.player.name;
            this.status = PlayerStatus.NONE;
            this.setPlayerCardModels(this.player.cards);
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
    
                this.player.passInScreen();
                this.resetCardsStatus();
            },
    
            // ↓ 画面に紐づいていないメソッド
    
            resetCardsStatus() {
                this.canOutputCards = false;
                this.playerCardModels.forEach(c => {
                    c.canSelect = true;
                    c.isSelected = false;
                });
            },
            selectExchangeCards(card) {
                if (this.player.rank === Rank.Hinmin || this.player.rank === Rank.Daihinmin) {
                    return;
                }
                card.isSelected = !card.isSelected;
                const selectedCardsCount = this.selectedPlayerCardModels().length;
                this.canOutputCards = selectedCardsCount === 2; // TODO 2 Magic Number
                if (this.canOutputCards) {
                    this.playerCardModels.filter(c => c.isSelected === false).forEach(c => c.canSelect = false);
                }
                else {
                    this.playerCardModels.forEach(c => c.canSelect = true);
                }
            },
            exchangeCards() {
                this.player.selectExchangeCardsInScreen(this.selectedPlayerCards());
                this.resetCardsStatus();
            },
            selectPullOutCards(card) {
                const selectableCards = this.playerCardModels.filter(c => c.canSelect).map(c => c.card);
                card.isSelected = !card.isSelected;
                
                const selectedCards = this.selectedPlayerCards();
                this.canOutputCards = selectedCards.length > 0;

                if (selectedCards.length === 0) {
                    this.playerCardModels.forEach(c => c.canSelect = true);
                    this.findSelectableCards();
                    return;
                }

                const selectableRemainingCards = Rule.findSelectableRemainingCards(
                    gameManager.battleFieldVM.cards,
                    selectableCards,
                    selectedCards
                );

                if (selectableRemainingCards.length === 0) return;

                this.playerCardModels.forEach(c => {
                    if (selectableRemainingCards.filter(d => c.card.id === d.id).length === 0) {
                        c.canSelect = false;
                    }
                });
            },
            pullOutCards() {
                this.player.pullOutCardsInScreen(this.selectedPlayerCards());
                this.resetCardsStatus();
            },
            setPlayerCardModels(cards) {
                this.playerCardModels = this.cardListToPlayerCardModelList(cards);
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
            },
            selectedPlayerCards() {
                return this.selectedPlayerCardModels().map(c => c.card);
            },
            findSelectableCards() {
                const selectableCards = Rule.findSelectableCards(gameManager.battleFieldVM.cards, this.playerCardModels.map(c => c.card));

                this.playerCardModels.forEach(c => {
                    if (selectableCards.filter(d => c.card.id === d.id).length === 0) {
                        c.canSelect = false;
                    }
                });
            }
        }
    };
};
