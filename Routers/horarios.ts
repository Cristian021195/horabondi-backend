import { Request, Response } from 'express';
import { existsSync, readdir, readdirSync, readFileSync, writeFileSync } from 'fs';
import {Router} from 'express'
import { cwd } from 'process';
import { DIRECTORIES, REGEX } from '../Utils';

export const horarios_route = Router();

horarios_route.get('/:empresa', (req:Request,res:Response)=>{
    const empresa = req.params.empresa;    
    try {
        
        let files_arr = readdirSync(DIRECTORIES.JSON_DIR_HORARIOS).filter((dir:string,dir_i:number)=>dir.includes(empresa+''));
        let data = files_arr.map((fa,fa_i)=>{
            return {...JSON.parse(readFileSync(DIRECTORIES.JSON_DIR_HORARIOS+'/'+fa, {encoding:'utf-8'})), data_file:fa.replace(REGEX.DATA_TEXT,"")}
        })

        //console.log(data)
        //let data = JSON.parse(fs.readFileSync(DIRECTORIES.JSON_DIR+'/exprebus-38-sabado-ns.json', {encoding:'utf-8'}));
        res.status(200).json(data);
    } catch (err:Error | any) {
        res.status(400).send({error:true, mensaje:"No se encontro archivo de horario .json", detalle: err})
    }

})