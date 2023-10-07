import { ILoadSurveysRepository } from '@data/protocols/db/surveys/ILoad-survey-repository'
import { ISurveyOutputModelDTO } from '../add-survey/db-add-survey-usecase'
import { DbLoadSurveysUseCase } from './Db-load-surveys-usecase'

const makeFakeSurveyData = (): ISurveyOutputModelDTO [] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_question'
      }],
      createdAt: new Date()
    }
  ]
}
describe('Db Load Surveys useCase', () => {
  it('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
      async loadAllSurveys (): Promise<ISurveyOutputModelDTO[]> {
        return await new Promise(resolve => resolve(makeFakeSurveyData()))
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAllSurveys')
    const sut = new DbLoadSurveysUseCase(loadSurveysRepositoryStub)
    await sut.loadSurveys()
    expect(loadSpy).toHaveBeenCalled()
  })
})
