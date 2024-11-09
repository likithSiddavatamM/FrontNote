import {createClient} from 'redis'
import { Request, Response, NextFunction } from 'express';

export const redisClient = createClient();
redisClient.connect();

export const cache = async(
    req:Request,
    res: Response,
    next: NextFunction
    )=>{
        let cachedData = await redisClient.get(req.params.id ? `${req.body.email}:${req.params.id}` : req.body.email)
        if(cachedData)
            res.json(JSON.parse(cachedData));
        else
            next()
    }