export interface RDSInstanceType {
  id: string;
  databaseName: string; // 기본 데이터 베이스 이름 (CREATE DATABASE ${databaseName} 이게 동작하는 듯
  instanceIdentifier: string; // 대시보드에 뜨는 구분자 이름
  instanceType: string; // ec2 instance type 과 동일
  version: MySqlEngineVersionType;
}

export const MySqlEngineVersionType = {
  VER_8_0_33: 'VER_8_0_33',
  VER_8_0_32: 'VER_8_0_32',
  VER_8_0_31: 'VER_8_0_31',
  VER_8_0_30: 'VER_8_0_30',
  VER_8_0_28: 'VER_8_0_28',
  VER_8_0_27: 'VER_8_0_27',
  VER_8_0_26: 'VER_8_0_26',
};

export type MySqlEngineVersionType =
  (typeof MySqlEngineVersionType)[keyof typeof MySqlEngineVersionType];
