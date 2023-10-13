import mockdate from 'mockdate'
import { MongoHelper } from '../helpers/mongoHelper'
import { SurveyMongoRepository } from './surveys-mongo-repository'
import { Collection } from 'mongodb'

let surveysCollection: Collection
const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}
describe('Survey MongoDb Repository', () => {
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
    surveysCollection.deleteMany({})
  })

  describe('add surveys()', () => {
    it('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        createdAt: new Date()
      })
      const survey = await surveysCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
  describe('loadAll surveys()', () => {
    it('Should load all surveys on success', async () => {
      await surveysCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }, {
            answer: 'other_answer'
          }],
          createdAt: new Date()
        },
        {
          question: 'any_question2',
          answers: [{
            image: 'any_image2',
            answer: 'any_answer2'
          }, {
            answer: 'other_answer2'
          }],
          createdAt: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAllSurveys()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('any_question2')
    })

    it('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAllSurveys()
      expect(surveys.length).toBe(0)
    })
  })
})
