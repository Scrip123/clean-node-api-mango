import request from 'supertest'
import jwt from 'jsonwebtoken'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'
import { Collection } from 'mongodb'
import env from '@main/config/env'
let surveysCollection: Collection
let accountsCollection: Collection

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
  describe('POST/ surveys', () => {
    it('Should return 403 if add Survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(403)
    })

    it('Should return 204 on add Survey with valid accessToken', async () => {
      const response = await accountsCollection.insertOne({
        name: 'elves',
        email: 'email@gmail.com',
        password: '123',
        role: 'admin'
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
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurvey())
        .expect(204)
    })
  })

  describe('GET/ surveys', () => {
    it('Should return 403 if Load Survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    it('Should return 200 on load Survey with accessToken', async () => {
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

      await surveysCollection.insertMany([makeFakeSurvey()])
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
