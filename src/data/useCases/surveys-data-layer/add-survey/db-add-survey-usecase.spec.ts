import { IAddSurveyInputModelDTO, IAddSurveyRepository } from './db-add-survey-usecase'
import { DbAddSurveyUseCase } from './db-add-survey-usecase-protocols'

const makeFakeSurveyData = (): IAddSurveyInputModelDTO => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_question'
  }]
})
describe('DbAddSurvey UseCase', () => {
  it('Should calls AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements IAddSurveyRepository {
      async add (data: IAddSurveyInputModelDTO): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const sut = new DbAddSurveyUseCase(addSurveyRepositoryStub)
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
