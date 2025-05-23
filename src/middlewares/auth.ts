import { NextFunction, RequestHandler } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Decoded } from "../types/auth";



export const jwtVerification = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      function (err, decoded) {
        if (err) {
          res.status(401).json({
            error: "Token missing or invalid.",
          });
        } else {
          const { id } = decoded as Decoded;
          req.userId = id;
          next();
        }
      }
    );
  } else {
    res.status(401).json({
      error: "Token missing or invalid.",
    });
  }
};
