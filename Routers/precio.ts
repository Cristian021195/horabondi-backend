import { Request, Response, Router } from 'express';
import { IFilesProps, INewIncomingForm } from '../Interfaces';
import { DIRECTORIES_B } from '../Utils';
import IncomingForm from 'formidable/Formidable';
export const precio = Router();

precio.get('/comprimir', (req:Request,res:Response)=>{
    const form:INewIncomingForm = new IncomingForm({ multiples: false });

    form.uploaddir = DIRECTORIES_B.EXCEL_DIR_HORARIOS;
    form.uploadDir = DIRECTORIES_B.EXCEL_DIR_HORARIOS;
    form.maxFileSize = 5 * 1024 * 1024; form.keepExtensions = true;
    
    form.parse(req, (err:Error, fields:any, files:any) => {
        let _files: IFilesProps = {
            archivo: null//nombre del key value en form-data postman
        }
        if(err){
            res.status(500).send({mensaje: "error al parsear / subir / crear archivo", detail: {err}})
        }else{
            if(Array.isArray(files.archivo)){       //si vienen varios archivos
                _files.archivo = files.archivo;
            }else{                                  //si viene un solo archivo
                _files.archivo = [files.archivo];
            }

            console.log(_files.archivo);
            res.status(200).send({error:false, mensaje:'ok'})
        }
    })



})