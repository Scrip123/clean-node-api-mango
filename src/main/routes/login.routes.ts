import { Router } from 'express'
import { makeSignupController } from '@main/factories/signUp/signupFactory'
import { adapteRoute } from '@main/adapter/express/expressRoutesAdapter'
import { makeLoginController } from '@main/factories/login/loginFactory'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignupController()))
  router.post('/login', adapteRoute(makeLoginController()))
}
