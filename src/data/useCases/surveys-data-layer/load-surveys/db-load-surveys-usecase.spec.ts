import mockdate from 'mockdate'
import { DbLoadSurveysUseCase } from './Db-load-surveys-usecase'
import { ILoadSurveysRepository } from './db-load-surveys-usecase-protocols'
import { throwError } from '@domain/test/test-error-helper'
import { mockLoadSurveysRepository } from '@data/test'
import { mockSurveyOutputParams } from '@domain/test'

type SutTypes = {
  sut: DbLoadSurveysUseCase
  loadSurveysRepositoryStub: ILoadSurveysRepository
}
const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveysUseCase(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('Db LoadSurveys useCase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })
  afterAll(() => {
    mockdate.reset()
  })
  it('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAllSurveys')
    await sut.loadSurveys()
    expect(loadSpy).toHaveBeenCalled()
  })

  it('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadSurveys()
    expect(surveys).toEqual([mockSurveyOutputParams()])
  })

  it('Should throws if AddSurveyRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAllSurveys').mockImplementationOnce(throwError)
    const promise = sut.loadSurveys()
    await expect(promise).rejects.toThrow()
  })
})
