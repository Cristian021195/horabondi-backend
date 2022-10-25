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
