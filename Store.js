
module.exports = function Store(defaultState) {
    this.__state = Object.assign({}, defaultState || {});
    this.__reducers = [];
}

var storePrototype = {
    commit(name, payload) {
        var count = this.__reducers.length;
        var total = count - 1;
        while (count--) {
            this.__state = this.__reducers[total - count](
                Object.assign({}, this.state), name, payload,
            ) || this.__state;
        }
    },

    use(...reducers) {
        this.__reducers.push(...reducers);
    },

    // removeReducer(params) {
        
    // },

    get state() {
        return Object.assign({}, this.__state);
    },
}

Object.assign(Store.prototype, storePrototype);
