import request from 'supertest'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'
import { Collection } from 'mongodb'
let collection: Collection
describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  beforeEach(async () => {
    collection = await MongoHelper.getCollection('surveys')
    collection.deleteMany({})
  })

  it('Should return 403 if add Survey without accessToken', async () => {
    const survey = {
      question: 'minha pergunta',
      answers: [{
        image: 'any_image.jpg',
        answer: 'resposta agora'
      }, {
        answer: 'resposta 2'
      }]
    }
    await request(app)
      .post('/api/surveys')
      .send(survey)
      .expect(403)
  })
})
