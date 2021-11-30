export default class HostRole {
    type: string;

    constructor(objType: string){
        let allowedTypes = ["general", "validator", "malicious"];
        if (allowedTypes.includes(objType)){
            this.type = objType;
        } else {
            this.type = "general";
        }
    }
}