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
    const bearerToken = req.header('Authorization')?.split(' ')[1];

      if(!bearerToken)
        {throw {code: HttpStatus.BAD_REQUEST,  message: 'Authorization token is required'};}
      try{
        req.body.fEmail=await jwt.verify(bearerToken, process.env.FORGOTPASSWORD_SECRET_KEY); }
      catch(error){
        req.body.email=await jwt.verify(bearerToken, process.env.SECRET_KEY); }
      next(); } 
    catch (error) {
    res.json({Error : `${error}`})}
};