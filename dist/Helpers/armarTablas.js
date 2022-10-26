"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.armarTablaPrecioJSON = exports.armarTablaHorarioJSON = void 0;
function armarTablaHorarioJSON(dataExcel, sheet) {
    let data_header;
    let data_body;
    data_header = Object.keys(dataExcel[0]);
    data_body = dataExcel.map((dE, dE_i) => Object.values(dE));
    return { data_header, data_body, data_validity: sheet };
}
exports.armarTablaHorarioJSON = armarTablaHorarioJSON;
function armarTablaPrecioJSON(dataExcel, name_file, sheet) {
    let data_file = name_file;
    let data_body;
    data_body = dataExcel;
    return { data_file, data_body, data_validity: sheet };
}
exports.armarTablaPrecioJSON = armarTablaPrecioJSON;
