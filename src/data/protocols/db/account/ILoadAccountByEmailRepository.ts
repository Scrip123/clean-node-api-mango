import { TypeAccountModelDataBase } from '@domain/models/IAccountModel'

export interface ILoadAccountByEmailRepository {
  loadAccountByEmail: (email: string) => Promise<TypeAccountModelDataBase>
}
