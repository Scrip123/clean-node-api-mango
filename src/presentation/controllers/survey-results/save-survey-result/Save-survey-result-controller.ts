import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { InvalidParamError } from '@presentation/errors'
import { forBidden, serverError } from '@presentation/helpers/http/httpHelper'
import { IController, TypesHttpRequest, TypesHttpResponse } from '@presentation/protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveyByIdUseCase: ILoadSurveyByIdDomain) {}
  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    try {
      const survey = await this.loadSurveyByIdUseCase.loadSurveyById(httpRequest.params.surveyId)
      if (!survey) return forBidden(new InvalidParamError('surveyId'))
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
