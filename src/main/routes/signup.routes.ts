import { Router } from 'express'
import { makeSignupController } from '@main/factories/signUp/signupFactory'
import { adapteRoute } from '@main/adapter/expressRoutesAdapter'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignupController()))
}
