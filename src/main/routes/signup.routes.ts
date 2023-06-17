import { Router } from 'express'
import { makeSignupController } from './factories/signupFactory'
import { adapteRoute } from '@main/adapter/expressRoutesAdapter'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignupController()))
}
