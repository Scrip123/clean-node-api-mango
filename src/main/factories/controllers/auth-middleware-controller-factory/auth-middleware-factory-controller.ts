import { makeLoadAccountByTokenFactoryUsecase } from '@main/factories/usecases/db-load-account-by-token-factory-usecase/db-load-account-by-token-factory-usecase'
import { AuthMiddlewareController } from '@presentation/controllers/middlewares/auth-middleware-controller'
import { IMiddleware } from '@presentation/protocols/IMiddleware'

export const makeAuthMiddlewareFactoryController = (role: string): IMiddleware => {
  return new AuthMiddlewareController(
    makeLoadAccountByTokenFactoryUsecase(),
    role
  )
}
