import { TypeAccountModelDataBase } from '@domain/models/IAccountModel'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<TypeAccountModelDataBase>
}
