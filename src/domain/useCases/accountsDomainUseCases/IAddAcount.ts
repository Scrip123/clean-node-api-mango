import { IAccountModelDataBase } from '@domain/models/IAccountModel'
export interface IAddAccountModel {
  name: string
  email: string
  password: string
}
export interface IAddAccount {
  add: (account: IAddAccountModel) => Promise<IAccountModelDataBase>
}
