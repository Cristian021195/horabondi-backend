import express, { Express, Request, Response, json } from 'express';
import dotenv from 'dotenv';
import { file_route } from './Routers/file';
import { upload_route } from './Routers/upload';
import { horarios_route } from './Routers/horarios';
import { precios_route } from './Routers/precios';
import cors from "cors";
dotenv.config();

const whitelist = ['http://localhost:3000','http://localhost:3002', 'https://horabondi.vercel.app']
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
const port = process.env.PORT || 3000;

app.get('/', cors(corsOptions), (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(json())
app.use('/file', cors(corsOptions), file_route)
app.use('/upload', cors(corsOptions), upload_route)
app.use('/horarios', cors(corsOptions),horarios_route)
app.use('/precios', cors(corsOptions), precios_route)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});