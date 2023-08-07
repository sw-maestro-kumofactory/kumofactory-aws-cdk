export interface RDSInstanceType {
    id: string;
    databaseName: string;
    instanceIdentifier: string;
    instanceType: string;
    version: MySqlEngineVersionType;
}
export declare const MySqlEngineVersionType: {
    VER_8_0_33: string;
    VER_8_0_32: string;
    VER_8_0_31: string;
    VER_8_0_30: string;
    VER_8_0_28: string;
    VER_8_0_27: string;
    VER_8_0_26: string;
};
export type MySqlEngineVersionType = typeof MySqlEngineVersionType[keyof typeof MySqlEngineVersionType];
