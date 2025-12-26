const Event: any = {
    message: [],
    on(type, fn) {
        if (typeof this.message[type] === 'undefined') {
            this.message[type] = [fn];
        } else {
            this.message[type].push(fn);
        }
    },

    emit(type, args) {
        if (!this.message[type]) return;
        const events = { type, args: args || {} };
        let i = 0;
        const len = this.message[type].length;
        for (i; i < len; i++) {
            this.message[type][i].call(this, events);
        }
    },

    off(type, fn) {
        if (Array.isArray(this.message[type])) {
            let i = this.message[type].length - 1;
            for (; i >= 0; i--) {
                this.message[type][i] === fn && this.message[type].splice(i, 1);
            }
        }
    }
};

export default Event;
