import { TypeAccountModelDataBase } from '@domain/models/IAccountModel'

export interface ILoadAccountByTokenRepository {
  loadAccountByToken: (token: string, role?: string) => Promise<TypeAccountModelDataBase>
}
