import { IController, IHttpRequest, IHttpResponse } from '@presentation/protocols'
import { LogControllerDecorator } from './LogControllerDecorator'

class ControllerStub implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse: IHttpResponse = {
      statusCode: 200,
      body: {
        name: 'elves'
      }
    }
    return await new Promise(resolve => resolve(httpResponse))
  }
}
describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
