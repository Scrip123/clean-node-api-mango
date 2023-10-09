import { adapteMiddleware } from '@main/adapter/express/express-middleware-adapter'
import { makeAuthMiddlewareFactoryController } from '@main/factories/controllers/auth-middleware-controller-factory/auth-middleware-factory-controller'

export const userAuthMiddleware = adapteMiddleware(makeAuthMiddlewareFactoryController())
