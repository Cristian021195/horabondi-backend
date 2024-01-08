"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.precio = void 0;
const express_1 = require("express");
const Utils_1 = require("../Utils");
const Formidable_1 = __importDefault(require("formidable/Formidable"));
exports.precio = (0, express_1.Router)();
exports.precio.get('/comprimir', (req, res) => {
    const form = new Formidable_1.default({ multiples: false });
    form.uploaddir = Utils_1.DIRECTORIES_B.EXCEL_DIR_HORARIOS;
    form.uploadDir = Utils_1.DIRECTORIES_B.EXCEL_DIR_HORARIOS;
    form.maxFileSize = 5 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        let _files = {
            archivo: null //nombre del key value en form-data postman
        };
        if (err) {
            res.status(500).send({ mensaje: "error al parsear / subir / crear archivo", detail: { err } });
        }
        else {
            if (Array.isArray(files.archivo)) { //si vienen varios archivos
                _files.archivo = files.archivo;
            }
            else { //si viene un solo archivo
                _files.archivo = [files.archivo];
            }
            console.log(_files.archivo);
            res.status(200).send({ error: false, mensaje: 'ok' });
        }
    });
});
