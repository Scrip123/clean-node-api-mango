import { IAccountModelDataBase } from '@domain/models/IAccountModel'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<IAccountModelDataBase>
}
