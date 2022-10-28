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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const file_1 = require("./Routers/file");
const upload_1 = require("./Routers/upload");
const horarios_1 = require("./Routers/horarios");
const precios_1 = require("./Routers/precios");
const Helpers_1 = require("./Helpers");
dotenv_1.default.config();
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
(0, Helpers_1.crearDirectoriosIniciales)();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
