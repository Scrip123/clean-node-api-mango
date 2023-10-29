import { Router } from 'express'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { userAuthMiddleware } from '@main/middlewares/auth-roles-middlewares/auth-role-user-middleware'
import { makeSaveSurveyResultFactoryController } from '@main/factories/controllers/survey-results-factories-controllers/save-survey-result-factory-controller'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', userAuthMiddleware, adapteRoute(makeSaveSurveyResultFactoryController()))
}
