import { InvalidParamError } from '@presentation/errors'
import { IValidation } from './IValidation'

export class CompareFieldValidation implements IValidation {
  constructor (private readonly fieldName: string,
    private readonly compareFieldName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.compareFieldName]) {
      return new InvalidParamError(this.compareFieldName)
    }
  }
}
