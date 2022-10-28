import { existsSync, mkdir, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { IFileFormidableProps, IFilesProps } from "../Interfaces";
import { DATA_DIRECTORIES_ARR, DATA_DIRECTORIES_ARR_B, DIRECTORIES, DIRECTORIES_B, REGEX } from "../Utils";
import { armarTablaHorarioJSON, armarTablaPrecioJSON } from "./armarTablas";
import {readFile, utils} from "xlsx";
import { pool } from "../config/db";
import { OkPacket } from "mysql2";
import { v4 as uuidv4 } from 'uuid';

export function crearDirectorioData():boolean{
    if(existsSync(DIRECTORIES_B.DATA_DIR)){return true}else{
        mkdir(DIRECTORIES_B.DATA_DIR, async(err)=>{
            if(!err){
                await Promise.all(
                    DATA_DIRECTORIES_ARR_B.map(dirname => mkdirSync(dirname))
                );
            }
        });
        return true;
    }
}
export function initDirectories(){
    if(!existsSync(DIRECTORIES_B.DATA_DIR)){
        mkdirSync('./data/excel/horarios', { recursive: true })
        mkdirSync('./data/excel/precios', { recursive: true })
        mkdirSync('./data/json/horarios', { recursive: true })
        mkdirSync('./data/json/precios', { recursive: true })
    }
}

export function crearArchivos(_files:IFilesProps):boolean{
    try {
        _files.archivo?.forEach(async(file:IFileFormidableProps,f_i:number)=>{
            let filepath = file.filepath;   let new_filepath = DIRECTORIES.EXCEL_DIR_HORARIOS+file.originalFilename;
            let name_file = file.originalFilename.replace(REGEX.DOT_SPREADSHEET,"");    let json_file= name_file+".json";
            let new_json_filepath = DIRECTORIES.JSON_DIR_HORARIOS+json_file;

            if(REGEX.PRECIO.test(name_file)){
                new_filepath = DIRECTORIES.EXCEL_DIR_PRECIOS+file.originalFilename;
                new_json_filepath = DIRECTORIES.JSON_DIR_PRECIOS+json_file;
            }   //console.log({original:file.originalFilename ,name_file,new_filepath, new_json_filepath});

            
                renameSync(filepath, new_filepath);
                let workbox = readFile(new_filepath);   let workbookSheets = workbox.SheetNames;
                const sheet = workbookSheets[0];    const dataExcel = utils.sheet_to_json(workbox.Sheets[sheet])

                if(REGEX.PRECIO.test(name_file)){
                    writeFileSync(new_json_filepath, JSON.stringify(armarTablaPrecioJSON(dataExcel, name_file, sheet)))
                }else{
                    writeFileSync(new_json_filepath, JSON.stringify(armarTablaHorarioJSON(dataExcel, sheet)))
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
                    
        })
        return true;
    } catch (error) {
        console.log("ERROR AL RENOMBRAR / CREAR JSON",error)
        return false;
    }
}