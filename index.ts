import express, { Express, Request, Response, json } from 'express';
import dotenv from 'dotenv';
import { file_route } from './Routers/file';
import { upload_route } from './Routers/upload';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(json())
app.use('/file', file_route)
app.use('/upload', upload_route)




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});