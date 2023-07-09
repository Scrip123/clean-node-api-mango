import { ServerError, UnAuthorizedError } from '@presentation/errors'
import { IHttpResponse } from '@presentation/protocols/IHttp'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})
export const unAuthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnAuthorizedError()
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})
