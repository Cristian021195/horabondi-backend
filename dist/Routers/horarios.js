"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horarios_route = void 0;
const fs_1 = require("fs");
const express_1 = require("express");
const Utils_1 = require("../Utils");
exports.horarios_route = (0, express_1.Router)();
exports.horarios_route.get('/:empresa', (req, res) => {
    const empresa = req.params.empresa;
    try {
        let files_arr = (0, fs_1.readdirSync)(Utils_1.DIRECTORIES.JSON_DIR_HORARIOS).filter((dir, dir_i) => dir.includes(empresa + ''));
        let data = files_arr.map((fa, fa_i) => {
            return Object.assign(Object.assign({}, JSON.parse((0, fs_1.readFileSync)(Utils_1.DIRECTORIES.JSON_DIR_HORARIOS + '/' + fa, { encoding: 'utf-8' }))), { data_file: fa.replace(Utils_1.REGEX.DATA_TEXT, "") });
        });
        //console.log(data)
        //let data = JSON.parse(fs.readFileSync(DIRECTORIES.JSON_DIR+'/exprebus-38-sabado-ns.json', {encoding:'utf-8'}));
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).send({ error: true, mensaje: "No se encontro archivo de horario .json", detalle: err });
    }
});
