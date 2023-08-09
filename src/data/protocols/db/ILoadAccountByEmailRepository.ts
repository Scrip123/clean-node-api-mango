import { IAccountModelDataBase } from '@domain/models/IAccountModel'

export interface ILoadAccountByEmailRepository {
  loadAccountByEmail: (email: string) => Promise<IAccountModelDataBase>
}
