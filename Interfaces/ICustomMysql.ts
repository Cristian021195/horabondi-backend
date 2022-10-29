import { OkPacket } from "mysql2"

export interface IUserListQuery extends OkPacket {
    email: string
    contra: string,
    name:string,
    image:string,
    tipo:string
  }