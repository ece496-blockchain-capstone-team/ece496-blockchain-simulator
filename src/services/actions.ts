import React from 'react';

export default class Actions {
    delay: number[] = [];
    action: string[] = [];


    constructor() {
        this.delay.push(0);
    }

    addAction(timeDelay: number, action: string) {
        this.action.push(action);
        this.delay.push(timeDelay);
    };

    getNextAction() {
        if (this.delay[0] === 0) {
            this.delay.shift();
            return this.action.shift();
        }
        this.delay[0] -= 1;
        return false;

    };

}
