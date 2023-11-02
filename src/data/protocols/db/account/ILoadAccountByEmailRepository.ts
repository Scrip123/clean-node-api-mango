import { TypeAccountOutputParams } from '@domain/models/IAccountModel'

export interface ILoadAccountByEmailRepository {
  loadAccountByEmail: (email: string) => Promise<TypeAccountOutputParams>
}
