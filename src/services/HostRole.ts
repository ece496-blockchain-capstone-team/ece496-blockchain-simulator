/**
 * # HostRole
 * The role that a host is performing
 */
export default class HostRole {
  /**
   * The name of the role
   */
  type: string;

  /**
   * Make sure the role is one of the supported types
   * @param objType The name of the role. It must be 'general', 'leader', or 'malicious'
   */
  constructor(objType: string) {
    let allowedTypes = ['general', 'leader', 'malicious'];
    if (allowedTypes.includes(objType)) {
      this.type = objType;
    } else {
      this.type = 'general';
    }
  }

  /**
   * @returns The name of the role
   */
  getType() {
    return this.type;
  }
}
