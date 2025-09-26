export abstract class CustomError extends Error {
  baseName: string
  baseStatus = 401
  constructor(baseName: string, message: string | undefined) {
    super(message)
    this.baseName = baseName
  }

  toString() {
    return this.baseName
  }
}

export class AuthenticationException extends CustomError {
  constructor(message: string | undefined = 'Erro de autenticação') {
    super('AuthenticationException', message)
  }
}
export class PublicKeyException extends CustomError {
  constructor(
    message: string | undefined = 'Impossível confirmar autenticação',
  ) {
    super('PublicKeyException', message)
  }
}

export class RefreshTokenException extends CustomError {
  constructor(message: string | undefined = 'Falha na renovação do token..') {
    super('RefreshTokenException', message)
  }
}

export class RefreshTokenUnavaiableException extends CustomError {
  constructor(
    message:
      | string
      | undefined = 'Falha na renovação do token. Necessário novo login.',
  ) {
    super('RefreshTokenUnavaiableException', message)
  }
}
export class InvalidTokenException extends CustomError {
  constructor(message: string | undefined = 'Token inválido') {
    super('InvalidTokenException', message)
  }
}

export class UserNotAllowedException extends CustomError {
  constructor(message: string | undefined = 'Usuário não permitido') {
    super('UserNotAllowedException', message)
  }
}
