/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      {throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };}

    req.body.email=await jwt.verify(bearerToken.split(' ')[1], process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.json({Error : `${error}`})
  }
};
