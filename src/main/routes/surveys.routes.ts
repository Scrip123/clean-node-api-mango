import { Router } from 'express'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { makeAddSurveyFactoryController } from '@main/factories/controllers/surveysFactoriesControllers/addSurveyFactoryController/addSurveyFactoryController'

export default (router: Router): void => {
  router.post('/surveys', adapteRoute(makeAddSurveyFactoryController()))
}
