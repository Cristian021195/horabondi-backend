"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_route = void 0;
const express_1 = require("express");
//import { existsSync, readdir, writeFileSync, mkdir, mkdirSync } from "fs";
const Helpers_1 = require("../Helpers");
//import { DATA_DIRECTORIES_ARR } from "../Utils";
const formidable_1 = require("formidable");
const Utils_1 = require("../Utils");
exports.upload_route = (0, express_1.Router)();
exports.upload_route.post('/archivos', (req, res) => {
    if ((0, Helpers_1.crearDirectorioData)('./data')) {
        const form = new formidable_1.IncomingForm({ multiples: true });
        form.uploaddir = Utils_1.DIRECTORIES.EXCEL_DIR_HORARIOS;
        form.uploadDir = Utils_1.DIRECTORIES.EXCEL_DIR_HORARIOS;
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
                (0, Helpers_1.crearArchivos)(_files) && console.log('SE CREARON TODOS LOS ARCHIVOS!');
                res.status(200).send({ error: false, mensaje: 'ok' });
            }
        });
    }
    else {
        res.send({ error: false, message: 'se crearon archivos por primera vez' });
    }
});
exports.upload_route.post('/horarios', (req, res) => {
    res.send({ error: false, message: '[ HORARIOS ] no se creo' });
});
exports.upload_route.post('/precios', (req, res) => {
    res.send({ error: false, message: '[ PRECIOS ] no se creo' });
});
