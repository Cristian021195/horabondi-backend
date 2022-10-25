import { Request, Response } from 'express';
import { existsSync, readdir } from 'fs';
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
    let arr_ar = [];
    readdir('./data',(err,files)=>{
        if(err){res.status(500).send({error:true, message:'error al leer directorio'})}
        arr_ar = files.map((ar)=> ar )
        
        res.send({error:false, archivos:[arr_ar]})
    })
})