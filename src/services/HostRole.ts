export default class HostRole {
  type: string;

  constructor(objType: string) {
    let allowedTypes = ['general', 'leader', 'malicious'];
    if (allowedTypes.includes(objType)) {
      this.type = objType;
    } else {
      this.type = 'general';
    }
  }

  getType() {
    return this.type;
  }
}
