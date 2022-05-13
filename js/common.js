
class Common {
    /**
     * @param {number} max 
     * @returns 0以上max未満のランダムな整数
     */
    static randomInt(max) {
        return crypto.getRandomValues(new Uint32Array(1))[0] % max;
    }
}
