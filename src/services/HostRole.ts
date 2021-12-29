/**
 * # HostRole
 * The role that a host is performing
 */
export default class HostRole {
  /**
   * The name of the role
   */
  private role: string;

  /**
   * A list of all possible host roles
   */
  private allowedRoles: string[] = ['general', 'leader', 'malicious'];

  /**
   * Make sure the role is one of the supported types. If not, it default to 'general'.
   * @param role The name of the role. It must be 'general', 'leader', or 'malicious'
   */
  constructor(role: string) {
    if (this.allowedRoles.includes(role)) {
      this.role = role;
    } else {
      this.role = 'general';
    }
  }

  /**
   * @returns The name of the role
   */
  getRole() {
    return this.role;
  }

  /**
   * @returns The list of all possible host roles
   */
  getAllowedRoles() {
    return this.allowedRoles;
  }
}
