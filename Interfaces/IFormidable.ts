import IncomingForm from "formidable/Formidable";

export interface IFormidableRequestsProps{
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number,
}
export interface IFormidableCustomProps {
    uploaddir: string,
    uploadDir: string,
    maxFileSize: number,
    keepExtensions: boolean,
    parse: (req:Request, any: (a:any,b:any,c:any)=>void) => void
}

export interface IFileFormidableProps{
    filepath:string,
    originalFilename: string,
}
export interface IFilesProps{
    archivo: any[] | null;
}

export interface INewIncomingForm extends IncomingForm{
    uploaddir?:string,
    uploadDir?:string,
    maxFileSize?:number
    keepExtensions?:boolean
}

/*

const form = new IncomingForm({ multiples: true });
        form.uploaddir = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS;    form.uploadDir = process.cwd()+DIRECTORIES.EXCEL_DIR_HORARIOS;
        form.maxFileSize = 50 * 1024 * 1024;                form.keepExtensions = true;
*/