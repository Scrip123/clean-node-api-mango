import { TypeAccountModelDataBase } from '@domain/models/IAccountModel'
import { TypesAddAccountModel } from '@domain/useCases/accountsDomainUseCases/IAddAcount'

export interface IAddAccountRepository {
  add: (account: TypesAddAccountModel) => Promise<TypeAccountModelDataBase>
}
