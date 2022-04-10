/**
 * # Actions
 * A log for the actions of a host
 */
import { NodeId } from '.';

export default class Actions {
  /**
   * A dictionary with a time value as the key and information about the actions as a value
   */
  private action: any = {};

  /**
   * Add a action to the log
   * @param time The time value when the actions took place
   * @param actions Information about the actions
   */
  addActions(nodeId: NodeId, time: number, actions: any[]): void {
    if (time in this.action) {
      if (nodeId in this.action[time]) {
        this.action[time][nodeId] = this.action[time][nodeId].concat(actions);
      } else {
        this.action[time][nodeId] = [];
        this.action[time][nodeId].push(actions[0]);
      }
      // this.action[time] = this.action[time].concat(actions);
    } else {
      this.action[time] = [];
      this.action[time][nodeId] = [];
      this.action[time][nodeId].push(actions[0]);
    }
  }

  /**
   * Delete all the actions at a particular time value
   * @param time The time value to delete
   */
  removeActions(time: number): void {
    if (time in this.action) {
      delete this.action[time];
    }
  }

  /**
   * Get the list of actions at a particular time value
   * @param time The time value to query
   * @returns A list of information about the actions
   */
  getActions(time: number): any {
    if (time in this.action) {
      return this.action[time];
    }
    return [];
  }
}
