import React from 'react';

export default class Actions {
  action: any = {};

  addAction(time: number, action: any[]){
    if (time in this.action){
      console.log('Exist')
      console.log(this.action)
      this.action[time].push(action)
    } else {
      console.log('Doesnt exist')
      console.log(this.action)
      this.action[time] = []
      this.action[time].push(action)
    }
  }

  removeAction(time: number){
    if(time in this.action){
      delete this.action[time]
    }
  }

  getNextAction(time: number) {
    if (time in this.action){
      return this.action[time]
    }
    return []
  }
}
