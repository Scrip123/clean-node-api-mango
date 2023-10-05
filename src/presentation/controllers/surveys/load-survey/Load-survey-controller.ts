import { IController, IHttpRequest, IHttpResponse, ILoadSurveyUseCaseDomain } from './load-survey-controller-protocols'
export class LoadSurveyController implements IController {
  constructor (private readonly loadSurveysUseCase: ILoadSurveyUseCaseDomain) {}
  async handle (httRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveysUseCase.loadSurveys()
    return null
  }
}
