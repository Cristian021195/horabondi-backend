import { Request, Response, Router } from "express";
//import { existsSync, readdir, writeFileSync, mkdir, mkdirSync } from "fs";
import { armarTablaHorarioJSON, armarTablaPrecioJSON, crearDirectorioData } from "../Helpers";
//import { DATA_DIRECTORIES_ARR } from "../Utils";
import {IncomingForm} from 'formidable'
import { IFileFormidableProps, IFilesProps, INewIncomingForm } from "../Interfaces";
import { DIRECTORIES, REGEX } from "../Utils";
import { readFile, utils } from "xlsx";
import { renameSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from 'uuid';
import { pool } from "../config/db";
import { OkPacket } from "mysql2";
export const upload_route = Router();

upload_route.post('/archivos', (req:Request,res:Response)=>{
    if(crearDirectorioData()){
        const form:INewIncomingForm = new IncomingForm({ multiples: true });
        form.uploaddir = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS;    form.uploadDir = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS;
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
                crearArchivos(_files)// && console.log('SE CREARON TODOS LOS ARCHIVOS!')
                res.status(200).send({error:false, mensaje:'ok'})
            }
        })
    }else{
        res.send({error:false, message:'se crearon archivos por primera vez'})
    }
})


function crearArchivos(_files:IFilesProps){

    _files.archivo?.forEach(async(file:IFileFormidableProps,f_i:number)=>{
        let filepath = file.filepath;   let new_filepath = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS+file.originalFilename;
        let name_file = file.originalFilename.replace(REGEX.DOT_SPREADSHEET,"");    let json_file= name_file+".json";
        let new_json_filepath = process.cwd()+DIRECTORIES.JSON_DIR_HORARIOS+json_file;

        if(REGEX.PRECIO.test(name_file)){
            new_filepath = process.cwd()+DIRECTORIES.EXCEL_DIR_PRECIOS+file.originalFilename;
            new_json_filepath = process.cwd()+DIRECTORIES.JSON_DIR_PRECIOS+json_file;
        }   //console.log({original:file.originalFilename ,name_file,new_filepath, new_json_filepath});
        //console.log({filepath, new_filepath,na me_file, json_file, new_json_filepath})
        try {
            console.log('asdasdas ASDASDAS ASD')
            renameSync(filepath, new_filepath);
            let workbox = readFile(new_filepath);   let workbookSheets = workbox.SheetNames;
            const sheet = workbookSheets[0];    const dataExcel = utils.sheet_to_json(workbox.Sheets[sheet])

            if(REGEX.PRECIO.test(name_file)){
                writeFileSync(new_json_filepath, JSON.stringify(armarTablaPrecioJSON(dataExcel, name_file, sheet)))
            }else{
                writeFileSync(new_json_filepath, JSON.stringify(armarTablaHorarioJSON(dataExcel, sheet)))
            }

            //ACTUALIZACION O CREACION DE LLAVES
            /*let data = await pool.query<OkPacket>("UPDATE `llaves` SET `llave` = ? WHERE `archivo` = ? ", [uuidv4(), name_file+"-key"]);
                if(data[0].affectedRows > 0){
                    console.log('Se editaron las llaves correctamente')
                }else{
                    let insert = await pool.query<OkPacket>("INSERT INTO `llaves` (`llave`, `archivo`) VALUES (?, ?)", [uuidv4(), name_file+"-key"]);
                    if(insert[0].affectedRows > 0){
                        console.log('se cargaron las llaves correctamente')
                    }else{
                        console.log('Error al cargar llaves')
                    }
                }*/

        } catch (error) {
            console.log("ERROR AL RENOMBRAR / CREAR JSON",error)
        }
    })
}

upload_route.post('/horarios', (req:Request,res:Response)=>{
    res.send({error:false, message:'[ HORARIOS ] no se creo'})
})
upload_route.post('/precios', (req:Request,res:Response)=>{
    res.send({error:false, message:'[ PRECIOS ] no se creo'})
})