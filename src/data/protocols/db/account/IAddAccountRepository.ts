import { IAccountModelDataBase } from '@domain/models/IAccountModel'
import { IAddAccountModel } from '@domain/useCases/IAddAcount'

export interface IAddAccountRepository {
  add: (account: IAddAccountModel) => Promise<IAccountModelDataBase>
}
