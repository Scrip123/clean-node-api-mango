import { Router } from 'express'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { makeAddSurveyFactoryController } from '@main/factories/controllers/surveysFactoriesControllers/addSurveyFactoryController/addSurveyFactoryController'
import { adapteMiddleware } from '@main/adapter/express/express-middleware-adapter'
import { makeAuthMiddlewareFactoryController } from '@main/factories/controllers/auth-middleware-controller-factory/auth-middleware-factory-controller'

export default (router: Router): void => {
  const adminAuthMiddleware = adapteMiddleware(makeAuthMiddlewareFactoryController('admin'))
  router.post('/surveys', adminAuthMiddleware, adapteRoute(makeAddSurveyFactoryController()))
}
