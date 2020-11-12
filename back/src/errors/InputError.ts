import { ValidationError } from 'class-validator'

export const isInputError = (error: Error): error is InputError => {
  return error.name === 'InputError'
}
class InputError extends Error {
  validationErrors: ValidationError[]

  constructor(validationErrors: ValidationError[]) {
    super('Validation errors occured in input')
    this.name = 'InputError'
    this.validationErrors = validationErrors
  }
}
export default InputError
