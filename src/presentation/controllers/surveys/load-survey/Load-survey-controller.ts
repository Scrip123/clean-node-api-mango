import { ok, serverError } from '@presentation/helpers/http/httpHelper'
import { IController, IHttpRequest, IHttpResponse, ILoadSurveyUseCaseDomain } from './load-survey-controller-protocols'
export class LoadSurveyController implements IController {
  constructor (private readonly loadSurveysUseCase: ILoadSurveyUseCaseDomain) {}
  async handle (httRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveysUseCase.loadSurveys()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
