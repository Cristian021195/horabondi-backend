"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
//import dotenv from 'dotenv';
// more confing
require('dotenv').config();
const file_1 = require("./Routers/file");
const upload_1 = require("./Routers/upload");
const horarios_1 = require("./Routers/horarios");
const precios_1 = require("./Routers/precios");
const Helpers_1 = require("./Helpers");
const db_1 = require("./config/db");
//dotenv.config();
/*const whitelist = ['http://localhost:3000','http://localhost:3002', 'https://horabondi.vercel.app']
const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app: Express = express();
const port = process.env.PORT;

app.get('/', cors(corsOptions), (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(json())
app.use('/file', cors(corsOptions), file_route)
app.use('/upload', cors(corsOptions), upload_route)
app.use('/horarios', cors(corsOptions),horarios_route)
app.use('/precios', cors(corsOptions), precios_route)*/
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, Helpers_1.initDirectories)();
app.get('/', (req, res) => {
    res.send('Cambio!!!');
});
app.use((0, express_1.json)());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
app.use('/file', file_1.file_route);
app.use('/upload', upload_1.upload_route);
app.use('/horarios', horarios_1.horarios_route);
app.use('/precios', precios_1.precios_route);
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield db_1.pool.query("SELECT * FROM usuarios;");
    res.send({ valor: data[0][0] });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
