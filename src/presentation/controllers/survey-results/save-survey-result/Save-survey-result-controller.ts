import { ILoadSurveyByIdDomain } from '@domain/useCases/surveys-domain-usecases/ILoad-survey-by-id'
import { ISaveSurveyResultDomain } from '@domain/useCases/surveys-result-domain-usecase/ISave-survey-result-model'
import { InvalidParamError } from '@presentation/errors'
import { forBidden, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { IController, TypesHttpRequest, TypesHttpResponse } from '@presentation/protocols'

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
