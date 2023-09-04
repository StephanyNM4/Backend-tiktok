import {Request, Response} from 'express';
import mongoose from 'mongoose';
import { Hashtag } from '../models/hashtags.model';
import { HashtagSchema } from '../models/hashtags.schema';


export const obtenerHashtags = (req: Request, res: Response) => {
    HashtagSchema.find()
    .then((result)=>{
        res.send({status: true, message: 'Hashtags mostrados', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    })
}

export const obtenerTiktoksDeHashtag = async (req: Request, res: Response) => {
    try {
        const hashtagId = req.params.id;
        const result = await HashtagSchema.aggregate([   
        {
        $lookup: {
            from: 'tiktoks',
            localField: 'id',
            foreignField: 'hashtags.id',
            as: 'tiktoksHashtags',
        },
        },
        {
            $match: {
            _id: new mongoose.Types.ObjectId(hashtagId),
            },
        },
        {
            $project: {
            tiktoksHashtags: true,
            },
        },
    ]).exec();
        res.send(result);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const agregarHashtag = (req: Request, res: Response) => {
    let hashtag = new HashtagSchema(req.body);
    hashtag.save()
    .then((result)=>{
        res.send({status: true, message: 'Hashtag agregado', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    })
}


export const eliminarHashtag = (req: Request, res: Response) => {
    HashtagSchema.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)})
    .then((result)=>{
        res.send({status: true, message: 'Hashtag eliminado', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    })
}


// export const login = (req: Request, res: Response) => {

// }