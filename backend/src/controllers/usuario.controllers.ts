import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {Usuario} from '../models/usuarios.model'
import { UsuarioSchema } from '../models/usuarios.shema';

export const login = (req: Request, res: Response) => {
    UsuarioSchema.findOne({usuario: req.body.usuario, password: req.body.password}, {password: false})
    .then((result)=>{
        res.send({status: true, message: 'Login correcto', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    })
}

//Obtener tiktoks de los usuarios seguidos
    export const tiktoksUsuariosSeguidos = async (req: Request, res: Response) => {
    try {
        const idusuarioIngresado = req.params.id;
        const result = await UsuarioSchema.aggregate([
            {
                $lookup: {
                from: 'tiktoks',
                localField: 'siguiendo.id',
                foreignField: 'idUsuario',
                as: 'detallesTiktoks',
                },
            },
                {
                    $match: {
                    _id: new mongoose.Types.ObjectId(idusuarioIngresado),
                    },
                },
                {
                    $project: {
                    detallesTiktoks: true,
                    },
                },
        ]).exec();
        // res.json(result);
        res.send(result);
        res.end();
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
        }
    }


// export const login = (req: Request, res: Response) => {

// }