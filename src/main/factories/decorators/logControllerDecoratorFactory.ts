import { LogErrorRepository } from '@infra/db/mongoDb/LogRepository/LogErrorMongoRepository'
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator'
import { IController } from '@presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logErrorRepository = new LogErrorRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
