export interface SecretType {
    id: string;
    secretName: string;
    username: string // rds 접속 username
    password: string // rds 접속 password
}