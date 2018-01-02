
function Store(defaultState) {
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

    use() {
        var args = Array.prototype.slice.call(arguments);
        this.__reducers.concat(args);
    },
    
    get state() {
        return Object.assign({}, this.__state);
    },
}

Object.assign(Store.prototype, storePrototype);

module.exports = Store;
