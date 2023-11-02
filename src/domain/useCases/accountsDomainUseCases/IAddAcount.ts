import { TypeAccountInputParams, TypeAccountOutputParams } from '@domain/models/IAccountModel'

export interface IAddAccount {
  add: (account: TypeAccountInputParams) => Promise<TypeAccountOutputParams>
}
