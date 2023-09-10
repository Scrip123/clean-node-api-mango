import { IController, IHttpRequest } from '@presentation/protocols'
import { Request, Response } from 'express'

export const adapteRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body
    }
    const httResponse = await controller.handle(httpRequest)
    if (httResponse.statusCode >= 200 || httResponse.statusCode <= 299) {
      response.status(httResponse.statusCode).json(httResponse.body)
    } else {
      response.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
