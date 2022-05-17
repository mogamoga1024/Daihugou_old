
const createBattleField = function(gameManager) {
    return {
        template: `
            <div id="battle-field">
                <template v-if="inGame">
                    <div class="card" v-for="card in cards">
                        <span :class="{'red-card': card.suit.isRed}">{{ card.name }}</span>
                    </div>
                </template>
                <button v-else-if="isFirstGame" @click="setStart">ゲーム開始</button>
                <button v-else @click="nextGameStart">次のゲームへ</button>
            </div>
        `,
        data() {
            return {
                cards: [],
                inGame: false,
                isFirstGame: true,
            }
        },
        created() {
            gameManager.battleFieldVM = this;
        },
        methods: {
            setStart() {
                gameManager.setStart();
            },
            nextGameStart() {
                gameManager.nextGameStart();
            }
        }
    };
};
