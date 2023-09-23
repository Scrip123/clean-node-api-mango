import request from 'supertest'
import jwt from 'jsonwebtoken'
import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import app from '@main/config/app'
import { Collection } from 'mongodb'
import env from '@main/config/env'
let collection: Collection
let accountsCollection: Collection
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

    accountsCollection = await MongoHelper.getCollection('accounts')
    accountsCollection.deleteMany({})
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

  it('Should return 204 on add Survey with accessToken', async () => {
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
      .set('x-access-token', accessToken)
      .send(survey)
      .expect(204)
  })
})
