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
exports.crearArchivos = exports.crearDirectoriosIniciales = exports.crearDirectorioData = void 0;
const fs_1 = require("fs");
const Utils_1 = require("../Utils");
const armarTablas_1 = require("./armarTablas");
const xlsx_1 = require("xlsx");
const db_1 = require("../config/db");
const uuid_1 = require("uuid");
function crearDirectorioData(src) {
    if ((0, fs_1.existsSync)(src)) {
        return true;
    }
    else {
        (0, fs_1.mkdir)(src, (err) => __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                yield Promise.all(Utils_1.DATA_DIRECTORIES_ARR.map(dirname => (0, fs_1.mkdirSync)(dirname)));
            }
        }));
        return true;
    }
}
exports.crearDirectorioData = crearDirectorioData;
function crearDirectoriosIniciales() {
    (0, fs_1.mkdirSync)('./data');
    (0, fs_1.mkdirSync)('./data/excel');
    //mkdirSync(DIRECTORIES.EXCEL_DIR); mkdirSync(DIRECTORIES.JSON_DIR);
    //mkdirSync(DIRECTORIES.EXCEL_DIR_HORARIOS); mkdirSync(DIRECTORIES.EXCEL_DIR_PRECIOS);
    //mkdirSync(DIRECTORIES.JSON_DIR_HORARIOS); mkdirSync(DIRECTORIES.JSON_DIR_PRECIOS);
}
exports.crearDirectoriosIniciales = crearDirectoriosIniciales;
function crearArchivos(_files) {
    var _a;
    try {
        (_a = _files.archivo) === null || _a === void 0 ? void 0 : _a.forEach((file, f_i) => __awaiter(this, void 0, void 0, function* () {
            let filepath = file.filepath;
            let new_filepath = Utils_1.DIRECTORIES.EXCEL_DIR_HORARIOS + file.originalFilename;
            let name_file = file.originalFilename.replace(Utils_1.REGEX.DOT_SPREADSHEET, "");
            let json_file = name_file + ".json";
            let new_json_filepath = Utils_1.DIRECTORIES.JSON_DIR_HORARIOS + json_file;
            if (Utils_1.REGEX.PRECIO.test(name_file)) {
                new_filepath = Utils_1.DIRECTORIES.EXCEL_DIR_PRECIOS + file.originalFilename;
                new_json_filepath = Utils_1.DIRECTORIES.JSON_DIR_PRECIOS + json_file;
            } //console.log({original:file.originalFilename ,name_file,new_filepath, new_json_filepath});
            (0, fs_1.renameSync)(filepath, new_filepath);
            let workbox = (0, xlsx_1.readFile)(new_filepath);
            let workbookSheets = workbox.SheetNames;
            const sheet = workbookSheets[0];
            const dataExcel = xlsx_1.utils.sheet_to_json(workbox.Sheets[sheet]);
            if (Utils_1.REGEX.PRECIO.test(name_file)) {
                (0, fs_1.writeFileSync)(new_json_filepath, JSON.stringify((0, armarTablas_1.armarTablaPrecioJSON)(dataExcel, name_file, sheet)));
            }
            else {
                (0, fs_1.writeFileSync)(new_json_filepath, JSON.stringify((0, armarTablas_1.armarTablaHorarioJSON)(dataExcel, sheet)));
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
        }));
        return true;
    }
    catch (error) {
        console.log("ERROR AL RENOMBRAR / CREAR JSON", error);
        return false;
    }
}
exports.crearArchivos = crearArchivos;
