import { IAccountModelDataBase } from '@domain/models/IAccountModel'
import { IAddAccountModel } from '@domain/useCases/accountsDomainUseCases/IAddAcount'

export interface IAddAccountRepository {
  add: (account: IAddAccountModel) => Promise<IAccountModelDataBase>
}
