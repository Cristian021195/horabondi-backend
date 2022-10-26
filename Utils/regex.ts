interface IMyRegex {
    DOT_SPREADSHEET: RegExp,
    SPREADSHEET: RegExp,
    EMPRESAS: RegExp,
    MAIL: RegExp,
    SPACE_BLANK: RegExp,
    SPACE: RegExp,
    SENTIDO: RegExp,
    DATA_TEXT: RegExp,
    PRECIO: RegExp,
}

export const REGEX: IMyRegex = {
    DATA_TEXT: /(.json|.jsonc|.txt|.xml)/g,
    DOT_SPREADSHEET: /(.xlsx|.ods|.csv|.xls)/g,
    SPREADSHEET: /(xlsx|ods|csv|xls)/g,
    EMPRESAS: /(exprebus|tesa|gutierrez)/g,
    MAIL: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g,
    SPACE_BLANK: /(\*|null|-|,|[a-hj-mp-rt-z]|[A-HJ-MP-RT-Z]|[!@#\$%\^\&*\)\(+=._-])/g,
    SPACE: /(\s)/g,
    SENTIDO: /(ns|sn|eo|oe)/g,
    PRECIO: /(precio|precios|PRECIO|PRECIOS)/i,
}// inos