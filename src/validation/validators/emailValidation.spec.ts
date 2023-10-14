import { IEmailValidator }
  from '@presentation/controllers/accounts/signUp/signUpProtocols'
import { EmailValidation } from './EmailValidation'
import { InvalidParamError } from '@presentation/errors'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}
const mockSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()

  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  it('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = mockSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const error = sut.validate({ email: 'any_email@gmail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('Should call EmailValidator with correct values', () => {
    const { sut, emailValidatorStub } = mockSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'any_email@gmail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = mockSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
