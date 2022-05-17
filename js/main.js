
(function() {
    const cpuNum = 3;
    const gameManager = new GameManager(cpuNum);

    const BattleField = createBattleField(gameManager);
    const PlayerItem = createPlayerItem(gameManager);
    const CpuList = createCpuList(gameManager);

    const App = {
        components: {
            BattleField,
            PlayerItem,
            CpuList
        }
    };

    Vue.createApp(App).mount("#app");
})();
