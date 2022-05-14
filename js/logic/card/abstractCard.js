
class AbstractCard {
    static _newId = 1;
    _id;
    get id() {
        return this._id;
    }

    constructor() {
        this._id = AbstractCard._newId++;
    }
}
