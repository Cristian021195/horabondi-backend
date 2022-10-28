"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_route = void 0;
const express_1 = require("express");
//import { existsSync, readdir, writeFileSync, mkdir, mkdirSync } from "fs";
const Helpers_1 = require("../Helpers");
//import { DATA_DIRECTORIES_ARR } from "../Utils";
const formidable_1 = require("formidable");
const Utils_1 = require("../Utils");
const xlsx_1 = require("xlsx");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const db_1 = require("../config/db");
exports.upload_route = (0, express_1.Router)();
exports.upload_route.post('/archivos', (req, res) => {
    if ((0, Helpers_1.crearDirectorioData)()) {
        const form = new formidable_1.IncomingForm({ multiples: true });
        form.uploaddir = process.cwd() + Utils_1.DIRECTORIES.EXCEL_DIR_HORARIOS;
        form.uploadDir = process.cwd() + Utils_1.DIRECTORIES.EXCEL_DIR_HORARIOS;
        form.maxFileSize = 20 * 1024 * 1024;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            let _files = {
                archivo: null //nombre del key value en form-data postman
            };
            if (err) {
                console.log(err);
                res.status(500).send({ mensaje: "error al parsear / subir / crear archivo" });
            }
            else {
                if (Array.isArray(files.archivo)) { //si vienen varios archivos
                    _files.archivo = files.archivo;
                }
                else { //si viene un solo archivo
                    _files.archivo = [files.archivo];
                }
                crearArchivos(_files); // && console.log('SE CREARON TODOS LOS ARCHIVOS!')
                res.status(200).send({ error: false, mensaje: 'ok' });
            }
        });
    }
    else {
        res.send({ error: false, message: 'se crearon archivos por primera vez' });
    }
});
function crearArchivos(_files) {
    var _a;
    (_a = _files.archivo) === null || _a === void 0 ? void 0 : _a.forEach((file, f_i) => __awaiter(this, void 0, void 0, function* () {
        let filepath = file.filepath;
        let new_filepath = process.cwd() + Utils_1.DIRECTORIES.EXCEL_DIR_HORARIOS + file.originalFilename;
        let name_file = file.originalFilename.replace(Utils_1.REGEX.DOT_SPREADSHEET, "");
        let json_file = name_file + ".json";
        let new_json_filepath = process.cwd() + Utils_1.DIRECTORIES.JSON_DIR_HORARIOS + json_file;
        if (Utils_1.REGEX.PRECIO.test(name_file)) {
            new_filepath = process.cwd() + Utils_1.DIRECTORIES.EXCEL_DIR_PRECIOS + file.originalFilename;
            new_json_filepath = process.cwd() + Utils_1.DIRECTORIES.JSON_DIR_PRECIOS + json_file;
        } //console.log({original:file.originalFilename ,name_file,new_filepath, new_json_filepath});
        //console.log({filepath, new_filepath,na me_file, json_file, new_json_filepath})
        try {
            (0, fs_1.renameSync)(filepath, new_filepath);
            let workbox = (0, xlsx_1.readFile)(new_filepath);
            let workbookSheets = workbox.SheetNames;
            const sheet = workbookSheets[0];
            const dataExcel = xlsx_1.utils.sheet_to_json(workbox.Sheets[sheet]);
            if (Utils_1.REGEX.PRECIO.test(name_file)) {
                (0, fs_1.writeFileSync)(new_json_filepath, JSON.stringify((0, Helpers_1.armarTablaPrecioJSON)(dataExcel, name_file, sheet)));
            }
            else {
                (0, fs_1.writeFileSync)(new_json_filepath, JSON.stringify((0, Helpers_1.armarTablaHorarioJSON)(dataExcel, sheet)));
            }
            //ACTUALIZACION O CREACION DE LLAVES
            let data = yield db_1.pool.query("UPDATE `llaves` SET `llave` = ? WHERE `archivo` = ? ", [(0, uuid_1.v4)(), name_file + "-key"]);
            if (data[0].affectedRows > 0) {
                console.log('Se editaron las llaves correctamente');
            }
            else {
                let insert = yield db_1.pool.query("INSERT INTO `llaves` (`llave`, `archivo`) VALUES (?, ?)", [(0, uuid_1.v4)(), name_file + "-key"]);
                if (insert[0].affectedRows > 0) {
                    console.log('se cargaron las llaves correctamente');
                }
                else {
                    console.log('Error al cargar llaves');
                }
            }
        }
        catch (error) {
            console.log("ERROR AL RENOMBRAR / CREAR JSON", error);
        }
    }));
}
exports.upload_route.post('/horarios', (req, res) => {
    res.send({ error: false, message: '[ HORARIOS ] no se creo' });
});
exports.upload_route.post('/precios', (req, res) => {
    res.send({ error: false, message: '[ PRECIOS ] no se creo' });
});
