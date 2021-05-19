import { StatusCodes } from 'http-status-codes'
import { AppError } from './app-error'

export class AccountDuplicateError extends AppError {
  constructor(message = '帳戶名稱已被使用') {
    super('UserRegisterError', message, StatusCodes.CONFLICT, true)
  }
}

export class LoginRefuseError extends AppError {
  constructor(message = '帳戶或密碼錯誤') {
    super('LoginError', message, StatusCodes.UNAUTHORIZED, true)
  }
}

export class NotLoginError extends AppError {
  constructor(message = 'you are not login') {
    super('LoginError', message, StatusCodes.UNAUTHORIZED, true)
  }
}

export class JWTError extends AppError {
  constructor(message = 'jwt error') {
    super('AuthError', message, StatusCodes.UNAUTHORIZED, true)
  }
}
