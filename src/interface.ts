export interface IResponse {
  status: "success" | "error";
  statusCode: number;
  data?: { [key: string]: any };
  message: string;
}

export interface IUserAuth {
  id: number;
  email: string;
}
