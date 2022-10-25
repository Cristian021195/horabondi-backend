import { Request, Response } from 'express';
import { existsSync } from 'fs';
import {Router} from 'express'
import { cwd } from 'process';

export const file_route = Router();

file_route.get('/excel', (req:Request,res:Response)=>{
    res.send('extamos desde file excel')
})

file_route.get('/current', (req:Request,res:Response)=>{
    res.send({
        current:__dirname,
        cwd: cwd(),
        existe: existsSync('./data')
    })
})

file_route.get('/exist', (req:Request,res:Response)=>{
    res.send({current:__dirname, cwd: cwd()})
})