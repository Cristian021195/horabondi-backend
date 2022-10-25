"use strict";
/*const formidable = require('formidable');
import {readFile, utils} from "xlsx";
import fs from "fs";
import { pool } from "../../../config/db";
import { DIRECTORIES, REGEX, DATA_DIRECTORIES_ARR } from '../../../src/Utils';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";
import { IFormidableRequestsProps, IFormidableCustomProps, IFilesProps, IFileFormidableProps } from "../../../src/Interfaces";
import { OkPacket } from "mysql2/promise";
import { armarTablaHorarioJSON, armarTablaPrecioJSON } from "../../../src/Helpers";

export default async function excel(req: IFormidableRequestsProps, res: NextApiResponse){
    if(fs.existsSync(process.cwd()+DIRECTORIES.DATA_DIR)){ // SI EXISTE CARPETA data

        const form:IFormidableCustomProps = new formidable.IncomingForm({ multiples: true });
        form.uploaddir = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS;    form.uploadDir = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS;
        form.maxFileSize = 50 * 1024 * 1024;                form.keepExtensions = true;
        
        form.parse(req, (err:Error, fields:any, files:any) => {
            let _files: IFilesProps = {
                archivo: null
            }
            if(err){
                res.status(500).send({mensaje: "error al parsear / subir / crear archivo"})
            }else{
                if(Array.isArray(files.archivo)){       //si vienen varios archivos
                    _files.archivo = files.archivo;
                }else{                                  //si viene un solo archivo
                    _files.archivo = [files.archivo];
                }
                crearArchivos(_files)
            }
        })

    // VERIFICAMOS LA CREACION DE LAS CARPETAS DE DATA
    }else{
        fs.mkdir(process.cwd()+DIRECTORIES.DATA_DIR, async(err)=>{
            if(!err){
                await Promise.all(
                    DATA_DIRECTORIES_ARR.map(dirname => fs.mkdirSync(process.cwd()+dirname))
                );
            }
        });
    }
    res.status(200).send({error:false, mensaje:'ok'})
    //res.send({error:false, mensaje:process.cwd()}) process.cwd()
}

export const config = {
    api: {
      bodyParser: false,
    },
};

function crearArchivos(_files:IFilesProps){

    _files.archivo?.forEach(async(file:IFileFormidableProps,f_i:number)=>{
        let filepath = file.filepath;   let new_filepath = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS+file.originalFilename;
        let name_file = file.originalFilename.replace(REGEX.DOT_SPREADSHEET,"");    let json_file= name_file+".json";
        let new_json_filepath = process.cwd()+DIRECTORIES.JSON_DIR_HORARIOS+json_file;

        if(REGEX.PRECIO.test(name_file)){
            new_filepath = process.cwd()+DIRECTORIES.EXCEL_DIR_PRECIOS+file.originalFilename;
            new_json_filepath = process.cwd()+DIRECTORIES.JSON_DIR_PRECIOS+json_file;
        }   //console.log({original:file.originalFilename ,name_file,new_filepath, new_json_filepath});

        try {
            fs.renameSync(filepath, new_filepath);
            let workbox = readFile(new_filepath);   let workbookSheets = workbox.SheetNames;
            const sheet = workbookSheets[0];    const dataExcel = utils.sheet_to_json(workbox.Sheets[sheet])

            if(REGEX.PRECIO.test(name_file)){
                fs.writeFileSync(new_json_filepath, JSON.stringify(armarTablaPrecioJSON(dataExcel, name_file, sheet)))
            }else{
                fs.writeFileSync(new_json_filepath, JSON.stringify(armarTablaHorarioJSON(dataExcel, sheet)))
            }

            //ACTUALIZACION O CREACION DE LLAVES
            let data = await pool.query<OkPacket>("UPDATE `llaves` SET `llave` = ? WHERE `archivo` = ? ", [uuidv4(), name_file+"-key"]);
                if(data[0].affectedRows > 0){
                    console.log('Se editaron las llaves correctamente')
                }else{
                    let insert = await pool.query<OkPacket>("INSERT INTO `llaves` (`llave`, `archivo`) VALUES (?, ?)", [uuidv4(), name_file+"-key"]);
                    if(insert[0].affectedRows > 0){
                        console.log('se cargaron las llaves correctamente')
                    }else{
                        console.log('Error al cargar llaves')
                    }
                }

        } catch (error) {
            console.log("ERROR AL RENOMBRAR / CREAR JSON",error)
        }
    })
}*/
console.log('a');
