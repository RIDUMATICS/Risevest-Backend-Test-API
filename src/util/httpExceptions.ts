export class HttpException extends Error {
  status = "error";
  statusCode;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HttpException";
    this.statusCode = statusCode;
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedException";
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFoundException";
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
    this.name = "BadRequestException";
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(409, message);
    this.name = "ConflictException";
  }
}