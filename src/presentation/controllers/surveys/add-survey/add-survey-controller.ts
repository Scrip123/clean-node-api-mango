import { badRequest, noContent, serverError } from '@presentation/helpers/http/httpHelper'
import { IAddSurvey, IController, TypesHttpRequest, TypesHttpResponse, IValidation } from './add-survey-protocols'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers,
        createdAt: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
