import request from 'supertest'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'
import { Collection } from 'mongodb'
import jwt from 'jsonwebtoken'
import env from '@main/config/env'

let surveysCollection: Collection
let accountsCollection: Collection

const makeFakeSurvey = (): any => ({
  question: 'minha pergunta',
  answers: [{
    image: 'any_image.jpg',
    answer: 'resposta agora'
  }, {
    answer: 'resposta 2'
  }],
  createdAt: new Date()
})

const makeFakeSurveyResult = (): any => ({
  answer: 'any_answer'
})
describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys')
    surveysCollection.deleteMany({})

    accountsCollection = await MongoHelper.getCollection('accounts')
    accountsCollection.deleteMany({})
  })

  describe('PUT/ surveys/:surveyId/results', () => {
    it('Should return 403 if Save Survey results without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_survey_id/results')
        .send(makeFakeSurveyResult())
        .expect(403)
    })

    it('Should return 200 if Save Survey results with accessToken', async () => {
      const surveyData = await surveysCollection.insertOne(makeFakeSurvey())
      const surveyId = surveyData.ops[0]._id

      const response = await accountsCollection.insertOne({
        name: 'elves',
        email: 'email@gmail.com',
        password: '123'

      })
      const id = response.ops[0]._id
      const accessToken = jwt.sign({ id }, env.JWT_SECRET)
      await accountsCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'resposta 2'
        })
        .expect(200)
    })
  })
})
