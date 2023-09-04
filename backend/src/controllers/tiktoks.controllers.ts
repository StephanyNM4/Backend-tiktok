import {Request, Response} from 'express';
import { Tiktok } from '../models/tiktoks.model';
import { TiktokSchema } from '../models/tiktoks.schema';
import mongoose from 'mongoose';




export const agregar = (req: Request, res: Response) => {
    let tiktok = new TiktokSchema(req.body);
    tiktok.save()
    .then((result)=>{
        res.send({status: true, message: 'Tiktok guardado', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    })
}

export const obtenerTiktoks = (req: Request, res: Response) => {
    TiktokSchema.find()
    .then((result)=>{
        res.send({status: true, message: 'Todos los tiktoks obtenidos', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    })
}


export const obtenerComentarios = (req: Request, res: Response) => {
    TiktokSchema.findOne({_id: new mongoose.Types.ObjectId(req.params.id)},{comentarios: true})
    .then((result)=>{
        res.send({status: true, message: 'Comentarios obtenidos', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    });
}

export const nuevoComentario = (req: Request, res: Response) => {
    TiktokSchema.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)},
    {
        $push: { 
            comentarios: {
                id: req.body.id,
                usuario: req.body.usuario,
                comentario: req.body.comentario
            } 
        }
        }
    ).then((result)=>{
        res.send({status: true, message: 'Comentario agregado', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    });
};


// export const login = (req: Request, res: Response) => {

// }