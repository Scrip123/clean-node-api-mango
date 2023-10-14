import { TypesHttpRequest, TypesHttpResponse } from './IHttp'

export interface IController {
  handle: (httpRequest: TypesHttpRequest) => Promise<TypesHttpResponse>
}
