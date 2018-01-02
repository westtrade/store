
function Store(defaultState) {
    this.__state = Object.assign({}, defaultState || {});
    this.__reducers = [];
}

var storePrototype = {
    commit: function (name, payload) {
        var count = this.__reducers.length;
        var total = count - 1;
        while (count--) {
            this.__state = (this.__reducers[total - count](Object.assign({}, this.__state), name, payload) 
                || this.__state);
        }
    },

    use: function () {
        var args = Array.prototype.slice.call(arguments);
        this.__reducers = this.__reducers.concat(args);
    },
}

Object.defineProperty(Store.prototype, 'state', {
    get: function () {
        return Object.assign({}, this.__state);
    }
});

Object.assign(Store.prototype, storePrototype);

module.exports = Store;
