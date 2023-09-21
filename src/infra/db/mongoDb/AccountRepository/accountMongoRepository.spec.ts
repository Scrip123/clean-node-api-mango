import { MongoHelper } from '../helpers/mongoHelper'
import { AccountMongoRepository } from './AccountMongoRepository'
import { Collection } from 'mongodb'

let accountCollection: Collection
const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}
describe('Account MongoDb Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.desconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  })

  describe('add()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('any_name')
      expect(account.email).toEqual('any_email@gmail.com')
      expect(account.password).toEqual('any_password')
    })
  })

  describe('loadAccountByEmail()', () => {
    it('Should return an account on loadAccountByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })
      const account = await sut.loadAccountByEmail('any_email@gmail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('any_name')
      expect(account.email).toEqual('any_email@gmail.com')
      expect(account.password).toEqual('any_password')
    })

    it('Should return null if loadAccountByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadAccountByEmail('any_email@gmail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAcessToken()', () => {
    it('Should update the account accessToken on updateAcessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
  describe('loadAccountByToken()', () => {
    it('Should return an account on loadAccountByToken without a role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadAccountByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })

    it('Should return an account on loadAccountByToken with role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'any_role'
      })
      const account = await sut.loadAccountByToken('any_token', 'any_role')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })
  })
})
