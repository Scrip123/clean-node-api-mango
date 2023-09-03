import { badRequest } from '@presentation/helpers/http/httpHelper'
import { IAddSurvey, IController, IHttpRequest, IHttpResponse, IValidation } from './add-survey-protocols'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)
    const { quation, answers } = httpRequest.body
    await this.addSurvey.add({
      quation,
      answers
    })
    return null
  }
}
