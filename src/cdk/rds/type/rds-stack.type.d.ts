import { RDSInstanceType } from "./RDSInstance.type";
import { SecretType } from "../../credential/type/secret.type";
export interface RdsStackType {
    secret: SecretType;
    instance: RDSInstanceType;
}
