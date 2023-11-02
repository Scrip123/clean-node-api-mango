import { TypeAccountOutputParams } from '@domain/models/IAccountModel'

export interface ILoadAccountByTokenRepository {
  loadAccountByToken: (token: string, role?: string) => Promise<TypeAccountOutputParams>
}
