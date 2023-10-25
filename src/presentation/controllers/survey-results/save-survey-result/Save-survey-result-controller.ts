import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { IController, TypesHttpRequest, TypesHttpResponse } from '@presentation/protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveyByIdUseCase: ILoadSurveyByIdDomain) {}
  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    await this.loadSurveyByIdUseCase.loadSurveyById(httpRequest.params.surveyId)
    return null
  }
}
