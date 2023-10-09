import { Router } from 'express'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { makeAddSurveyFactoryController } from '@main/factories/controllers/surveysFactoriesControllers/addSurveyFactoryController/addSurveyFactoryController'
import { adminAuthMiddleware } from '@main/middlewares/auth-roles-middlewares/admin-role-middleware'

export default (router: Router): void => {
  router.post('/surveys', adminAuthMiddleware, adapteRoute(makeAddSurveyFactoryController()))
}
