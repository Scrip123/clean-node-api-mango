import mockdate from 'mockdate'
import { MongoHelper } from '../helpers/mongoHelper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { TypesSurveyOutputModelDTO } from '@domain/models/ISurvey-model-domain'
import { TypeAccountOutputParams } from '@domain/models/IAccountModel'
import { Collection } from 'mongodb'

let surveyResultCollection: Collection
let accountsCollection: Collection
let surveysCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<TypesSurveyOutputModelDTO> => {
  const response = {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    createdAt: new Date()
  }
  const responseSurvey = await surveysCollection.insertOne(response)
  return responseSurvey.ops[0]
}

const makeAccount = async (): Promise<TypeAccountOutputParams> => {
  const response = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
  const responseAccount = await accountsCollection.insertOne(response)
  return responseAccount.ops[0]
}
describe('SurveyResult MongoDb Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    mockdate.set(new Date())
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
    mockdate.reset()
  })
  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })

  describe('Save()', () => {
    it('Should add SurveyResult if its new', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: accountId.id,
        answer: survey.answers[0].answer,
        createdAt: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    it('Should add SurveyResult if its not new', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccount()
      const res = await surveyResultCollection.insertOne({
        surveyId: survey.id,
        accountId: accountId.id,
        answer: survey.answers[0].answer,
        createdAt: new Date()
      })

      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: accountId.id,
        answer: survey.answers[1].answer,
        createdAt: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(res.ops[0]._id)
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
