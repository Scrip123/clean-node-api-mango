import { Router } from 'express'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { makeLoginController } from '@main/factories/controllers/controllersAccountsFactories/login/loginControllerFactory'
import { makeSignupController } from '@main/factories/controllers/controllersAccountsFactories/signUp/signupControllerFactory'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignupController()))
  router.post('/login', adapteRoute(makeLoginController()))
}
