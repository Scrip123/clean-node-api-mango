import request from 'supertest'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
let collection: Collection
describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  beforeEach(async () => {
    collection = await MongoHelper.getCollection('accounts')
    collection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await collection.insertOne({
        name: 'elves',
        email: 'elvestrindade@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'elvestrindade@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
