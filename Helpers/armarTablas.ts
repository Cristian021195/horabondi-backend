export function armarTablaHorarioJSON(dataExcel:any[], sheet:string){
    let data_header: string[];
    let data_body: any[];
  
    data_header = Object.keys(dataExcel[0]);
    data_body = dataExcel.map((dE, dE_i)=> Object.values(dE))
  
    return {data_header, data_body, data_validity: sheet}
}
export function armarTablaPrecioJSON(dataExcel:any[], name_file:string, sheet:string){
    let data_file = name_file;
    let data_body: any[];

    data_body = dataExcel;
  
    return {data_file, data_body, data_validity: sheet}
}