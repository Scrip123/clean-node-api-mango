import env from '@main/config/env'
import { AuthenticationUseCase } from '@data/useCases/authentication/Authentication'
import { AccountMongoRepository } from '@infra/db/mongoDb/AccountRepository/AccountMongoRepository'
import { BcrypterAdapter } from '@infra/cryptografy/bcryptAdapter/BcrypterAdapter'
import { JwtAdapter } from '@infra/cryptografy/jwtAdapter/JwtAdapter'
import { IAuthentication } from '@domain/useCases/IAuthentication'

export const makeAuthenticationUseCaseFactory = (): IAuthentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  return new AuthenticationUseCase(
    accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository
  )
}
