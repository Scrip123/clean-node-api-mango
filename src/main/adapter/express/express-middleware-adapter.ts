import { TypesHttpRequest } from '@presentation/protocols'
import { IMiddleware } from '@presentation/protocols/IMiddleware'
import { NextFunction, Request, Response } from 'express'

export const adapteMiddleware = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: TypesHttpRequest = {
      headers: request.headers
    }
    const httResponse = await middleware.handle(httpRequest)
    if (httResponse.statusCode === 200) {
      Object.assign(request, httResponse.body)
      next()
    } else {
      return response.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
