import { IHttpRequest } from '@presentation/protocols'
import { IMiddleware } from '@presentation/protocols/IMiddleware'
import { NextFunction, Request, Response } from 'express'

export const adapteMiddleware = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: request.headers
    }
    const httResponse = await middleware.handle(httpRequest)
    if (httResponse.statusCode === 200) {
      Object.assign(request, httpRequest.body)
      next()
    } else {
      response.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
