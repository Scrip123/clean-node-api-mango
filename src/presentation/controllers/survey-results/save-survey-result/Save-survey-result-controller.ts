import { IController, ILoadSurveyByIdDomain, ISaveSurveyResultDomain, InvalidParamError, TypesHttpRequest, TypesHttpResponse, forBidden, ok, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyByIdUseCase: ILoadSurveyByIdDomain,
    private readonly saveSurveyResultUseCase: ISaveSurveyResultDomain
  ) {}

  async handle (httpRequest: TypesHttpRequest): Promise<TypesHttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const survey = await this.loadSurveyByIdUseCase.loadSurveyById(surveyId)
      if (!survey) return forBidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map(a => a.answer)
      if (!answers.includes(answer)) {
        return forBidden(new InvalidParamError('answer'))
      }

      const surveyResult = await this.saveSurveyResultUseCase.save({
        surveyId,
        accountId,
        answer,
        createdAt: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
