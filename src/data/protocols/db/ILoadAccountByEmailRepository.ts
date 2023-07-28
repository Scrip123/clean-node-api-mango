import { IAccountModelDataBase } from '@domain/models/IAccountModel'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModelDataBase>
}