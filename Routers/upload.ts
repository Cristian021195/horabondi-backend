import { Request, Response, Router } from "express";
//import { existsSync, readdir, writeFileSync, mkdir, mkdirSync } from "fs";
import { crearArchivos, crearDirectorioData } from "../Helpers";
//import { DATA_DIRECTORIES_ARR } from "../Utils";
import {IncomingForm} from 'formidable'
import { IFilesProps, INewIncomingForm } from "../Interfaces";
import { DIRECTORIES } from "../Utils";

export const upload_route = Router();

upload_route.post('/archivos', (req:Request,res:Response)=>{
    if(crearDirectorioData('./data')){
        const form:INewIncomingForm = new IncomingForm({ multiples: true });
        form.uploaddir = DIRECTORIES.EXCEL_DIR_HORARIOS;    form.uploadDir = DIRECTORIES.EXCEL_DIR_HORARIOS;
        form.maxFileSize = 20 * 1024 * 1024;                form.keepExtensions = true;
        
        form.parse(req, (err:Error, fields:any, files:any) => {
            let _files: IFilesProps = {
                archivo: null//nombre del key value en form-data postman
            }
            if(err){
                console.log(err)
                res.status(500).send({mensaje: "error al parsear / subir / crear archivo"})
            }else{
                if(Array.isArray(files.archivo)){       //si vienen varios archivos
                    _files.archivo = files.archivo;
                }else{                                  //si viene un solo archivo
                    _files.archivo = [files.archivo];
                }
                crearArchivos(_files) && console.log('SE CREARON TODOS LOS ARCHIVOS!')
                res.status(200).send({error:false, mensaje:'ok'})
            }
        })
    }else{
        res.send({error:false, message:'se crearon archivos por primera vez'})
    }
})

upload_route.post('/horarios', (req:Request,res:Response)=>{
    res.send({error:false, message:'[ HORARIOS ] no se creo'})
})
upload_route.post('/precios', (req:Request,res:Response)=>{
    res.send({error:false, message:'[ PRECIOS ] no se creo'})
})