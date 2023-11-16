export enum ErrorCode {
  IncorrectEmailPassword = "incorrect-email-password",
  InternalServerError = "internal-server-error",
}

export class UnauthenticatedError extends Error {
  constructor(message: string = "Unauthenticated") {
    super(message);
    this.name = "UnauthenticatedError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Not Found") {
    super(message);
    this.name = "NotFoundError";
  }
}
