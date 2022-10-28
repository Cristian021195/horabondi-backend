import { Request, Response } from 'express';
import { existsSync, readdir, writeFileSync } from 'fs';
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

file_route.post('/buscar', (req:Request,res:Response)=>{
    const dir = req.body?.directorio+'';
    let arr_ar = [];
    readdir('./data'+dir,(err,files)=>{
        if(err){res.status(500).send({error:true, message:'error al leer directorio'})}
        arr_ar = files.map((ar)=> ar )
        
        res.send({error:false, archivos:[arr_ar]})
    })
})

file_route.post('/create', (req:Request,res:Response)=>{
    if(req.body?.create && req.body?.create === true){
        writeFileSync('./data/'+req.body?.namefile, JSON.stringify(req.body.data))
        if(existsSync('./data/'+req.body?.namefile)){
            res.send({error:false, message:'archivo creado correctamente!'})
        }else{
            res.send({error:true, message:'no se creo'})
        }
    }else{
        res.send({error:true, message:'bad'})
    }
})

file_route.get('/currents', (req:Request,res:Response)=>{
    res.send({
        cwd: process.cwd(),
        dirname: __dirname,
        custom: "\\data\\excel\\horarios\\",
        exists_custom_cwd_data_folder: existsSync(process.cwd()+"\\data\\"),
        exists_custom_cwd_data_json_folder: existsSync(process.cwd()+"\\data\\json\\"),
        exists_custom_cwd_data_json_horarios_folder: existsSync(process.cwd()+"\\data\\json\\horarios\\"),
        exists_custom_cwd_data_json_horarios_file: existsSync(process.cwd()+"\\data\\json\\horarios\\exprebus-38-sabados-ns.json")
    })
})