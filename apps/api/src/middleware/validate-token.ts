import type { NextFunction, Response } from "express";
import { firebaseAuth } from "../firebase";
import { TokenRequest } from "../types/requests";




// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ignoring for now
function validateToken(req: TokenRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed. Token is missing. "});
  }

  firebaseAuth.verifyIdToken(token.split(" ")[1])
    .then((decodedToken) => {
      // Attach token to request object for further use
      req.user = decodedToken;
      next();
    }).catch((err) => {
      console.error(err);
      return res.status(401).json({ message: 'Authentication failed. Invalid token.'});
    });

}

export default validateToken;