import { DbLoadAccountByToken } from '@data/useCases/load-account-by-token/db-load-account-by-token'
import { ILoadAccountByToken } from '@domain/useCases/middleware-domain-usecase/ILoad-account-by-token'
import { JwtAdapter } from '@infra/cryptografy/jwtAdapter/JwtAdapter'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import env from '@main/config/env'
export const makeLoadAccountByTokenFactoryUsecase = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
