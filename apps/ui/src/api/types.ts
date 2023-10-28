import { AxiosError } from "axios";

interface IApiError {
  message: string;
  stack: string | null;
}

export type ApiError = AxiosError<IApiError>;