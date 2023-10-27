import type { Request, Response } from "express";
import type admin from "firebase-admin";

export interface TokenRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export interface CustomRequest<T> extends TokenRequest {
  body: T;
}

type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T;

export interface CustomResponse<T> extends Response {
  json: Send<T, this>;
}