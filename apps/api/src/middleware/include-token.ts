import type { NextFunction, Response } from "express";
import { firebaseAuth } from "../firebase";
import { TokenRequest } from "../types/requests";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ignoring for now
function includeToken(req: TokenRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    next();
    return;
  }

  firebaseAuth
    .verifyIdToken(token.split(" ")[1])
    .then((decodedToken) => {
      // Attach token to request object for further use
      req.user = decodedToken;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => next());
}

export default includeToken;
