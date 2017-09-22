class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config === undefined) {
            throw new Error();
        }
        this.config = config;
        this.config.initial = "normal";
        this.state = ['normal', 'busy', 'hungry', 'sleeping'];
        this.undoStates = [];
        this.redoStates = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.state.includes(state)) {
            throw new Error();
        }
        this.undoStates.push(this.config.initial);
        this.redoStates = [];
        this.config.initial = state;

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.redoStates = [];
        this.changeState(this.config.states[this.getState()].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState("normal");
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return this.state;
        }
        return Object.keys(this.config.states).filter(v => this.config.states[v].transitions[event] != undefined);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoStates.length != 0) {
            this.redoStates.push(this.config.initial);
            this.config.initial = this.undoStates.pop();
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoStates.length != 0) {
            this.config.initial = this.redoStates.pop();
            return true;
        }
        return false;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoStates = [];
        this.redoStates = [];
    }
}

module.exports = FSM;
