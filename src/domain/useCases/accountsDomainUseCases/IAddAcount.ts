import { TypeAccountModelDataBase } from '@domain/models/IAccountModel'
export type TypesAddAccountModel = {
  name: string
  email: string
  password: string
}
export interface IAddAccount {
  add: (account: TypesAddAccountModel) => Promise<TypeAccountModelDataBase>
}
