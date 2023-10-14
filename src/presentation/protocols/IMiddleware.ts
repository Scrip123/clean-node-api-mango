import { TypesHttpRequest, TypesHttpResponse } from './IHttp'

export interface IMiddleware {
  handle: (httpRequest: TypesHttpRequest) => Promise<TypesHttpResponse>
}
