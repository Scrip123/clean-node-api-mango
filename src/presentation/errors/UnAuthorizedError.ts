export class UnAuthorizedError extends Error {
  constructor () {
    super('UnAuthorizedError')
    this.name = 'UnAuthorizedError'
  }
}
