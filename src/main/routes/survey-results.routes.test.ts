import request from 'supertest'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'

describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })

  const makeFakeSurveyResult = (): any => ({
    answer: 'any_answer'
  })
  describe('PUT/ surveys/:surveyId/results', () => {
    it('Should return 403 if Save Survey results without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_survey_id/results')
        .send(makeFakeSurveyResult())
        .expect(403)
    })
  })
})
