import { TypeAccountOutputParams } from '@domain/models/IAccountModel'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<TypeAccountOutputParams>
}
