import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Database } from './utils/database';
import usuarioRouter from './routers/usuario.routers';
import tiktokRouter from './routers/tiktok.routers';
import hashtagRouter from './routers/hashtag.routers';


dotenv.config();

const app:Express = express();
const port = process.env.PORT;
const database = new Database();

app.use(express.json());
app.use('/usuarios', usuarioRouter);
app.use('/tiktoks', tiktokRouter);
app.use('/hashtags', hashtagRouter);


app.use(cors());
app.use(express());
app.use(express.urlencoded({extended:true}));

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor en funcionamiento')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    
})

