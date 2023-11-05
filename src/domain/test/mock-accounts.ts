import { TypeAccountInputParams, TypeAccountOutputParams } from '@domain/models/IAccountModel'

export const mockAccountInputParams = (): TypeAccountInputParams => ({
  name: 'any_name',
  email: 'any_email@gmail.com',
  password: 'any_password'
})
export const mockAccountOutputParams = (): TypeAccountOutputParams => ({
  id: 'any_valid_id',
  name: 'any_valid_name',
  email: 'any_valid_email',
  password: 'any_hashed_password'
})
