import { IController, IHttpRequest } from '@presentation/protocols'
import { Request, Response } from 'express'

export const adapteRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body
    }
    const httResponse = await controller.handle(httpRequest)
    response.status(httResponse.statusCode).json(httResponse.body)
  }
}
