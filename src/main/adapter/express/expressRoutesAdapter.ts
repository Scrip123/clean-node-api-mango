import { IController, TypesHttpRequest } from '@presentation/protocols'
import { Request, Response } from 'express'

export const adapteRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: TypesHttpRequest = {
      body: request.body,
      params: request.params,
      accountId: request.accountId
    }
    const httResponse = await controller.handle(httpRequest)
    if (httResponse.statusCode >= 200 && httResponse.statusCode <= 299) {
      response.status(httResponse.statusCode).json(httResponse.body)
    } else {
      response.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
