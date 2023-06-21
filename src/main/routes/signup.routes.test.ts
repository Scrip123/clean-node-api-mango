import request from 'supertest'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  beforeEach(async () => {
    const collection = await MongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'elves',
        email: 'elvestrindade@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
