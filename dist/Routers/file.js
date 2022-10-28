"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_route = void 0;
const fs_1 = require("fs");
const express_1 = require("express");
const process_1 = require("process");
exports.file_route = (0, express_1.Router)();
exports.file_route.get('/excel', (req, res) => {
    res.send('extamos desde file excel');
});
exports.file_route.get('/current', (req, res) => {
    res.send({
        current: __dirname,
        cwd: (0, process_1.cwd)(),
        existe: (0, fs_1.existsSync)('./data')
    });
});
exports.file_route.get('/exist', (req, res) => {
    let arr_ar = [];
    (0, fs_1.readdir)('./data', (err, files) => {
        if (err) {
            res.status(500).send({ error: true, message: 'error al leer directorio' });
        }
        arr_ar = files.map((ar) => ar);
        res.send({ error: false, archivos: [arr_ar] });
    });
});
exports.file_route.post('/buscar', (req, res) => {
    var _a;
    const dir = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.directorio) + '';
    let arr_ar = [];
    (0, fs_1.readdir)('./data' + dir, (err, files) => {
        if (err) {
            res.status(500).send({ error: true, message: 'error al leer directorio' });
        }
        arr_ar = files.map((ar) => ar);
        res.send({ error: false, archivos: [arr_ar] });
    });
});
exports.file_route.post('/create', (req, res) => {
    var _a, _b, _c, _d;
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.create) && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.create) === true) {
        (0, fs_1.writeFileSync)('./data/' + ((_c = req.body) === null || _c === void 0 ? void 0 : _c.namefile), JSON.stringify(req.body.data));
        if ((0, fs_1.existsSync)('./data/' + ((_d = req.body) === null || _d === void 0 ? void 0 : _d.namefile))) {
            res.send({ error: false, message: 'archivo creado correctamente!' });
        }
        else {
            res.send({ error: true, message: 'no se creo' });
        }
    }
    else {
        res.send({ error: true, message: 'bad' });
    }
});
exports.file_route.get('/currents', (req, res) => {
    res.send({
        cwd: process.cwd(),
        dirname: __dirname,
        custom: "\\data\\excel\\horarios\\",
        exists_custom_cwd_data_folder: (0, fs_1.existsSync)(process.cwd() + "\\data\\"),
        exists_custom_cwd_data_json_folder: (0, fs_1.existsSync)(process.cwd() + "\\data\\json\\"),
        exists_custom_cwd_data_json_horarios_folder: (0, fs_1.existsSync)(process.cwd() + "\\data\\json\\horarios\\"),
        exists_custom_cwd_data_json_horarios_file: (0, fs_1.existsSync)(process.cwd() + "\\data\\json\\horarios\\exprebus-38-sabados-ns.json")
    });
});
