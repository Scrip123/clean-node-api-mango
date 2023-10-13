import { Router } from 'express'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { makeAddSurveyFactoryController } from '@main/factories/controllers/surveysFactoriesControllers/addSurveyFactoryController/addSurveyFactoryController'
import { adminAuthMiddleware } from '@main/middlewares/auth-roles-middlewares/admin-role-middleware'
import { userAuthMiddleware } from '@main/middlewares/auth-roles-middlewares/auth-role-user-middleware'
import { makeLoadSurveyFactoryController } from '@main/factories/controllers/surveysFactoriesControllers/load-surveys-factory-controller/load-survey-factory-controller'

export default (router: Router): void => {
  router.post('/surveys', adminAuthMiddleware, adapteRoute(makeAddSurveyFactoryController()))
  router.get('/surveys', userAuthMiddleware, adapteRoute(makeLoadSurveyFactoryController()))
}
