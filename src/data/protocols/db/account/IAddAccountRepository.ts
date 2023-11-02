import { TypeAccountInputParams, TypeAccountOutputParams } from '@domain/models/IAccountModel'

export interface IAddAccountRepository {
  add: (account: TypeAccountInputParams) => Promise<TypeAccountOutputParams>
}
