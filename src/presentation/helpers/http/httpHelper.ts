import { ServerError, UnAuthorizedError } from '@presentation/errors'
import { TypesHttpResponse } from '@presentation/protocols/IHttp'

export const badRequest = (error: Error): TypesHttpResponse => ({
  statusCode: 400,
  body: error
})
export const forBidden = (error: Error): TypesHttpResponse => ({
  statusCode: 403,
  body: error
})
export const unAuthorized = (): TypesHttpResponse => ({
  statusCode: 401,
  body: new UnAuthorizedError()
})

export const serverError = (error: Error): TypesHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): TypesHttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): TypesHttpResponse => ({
  statusCode: 204,
  body: null
})
