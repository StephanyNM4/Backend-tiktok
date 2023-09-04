import mongoose, { Schema }  from "mongoose";
import {Tiktok, Comentario, Hashtag } from "./tiktoks.model";


const schema = new mongoose.Schema<Tiktok>({
    id : Number,
    titulo : String,
    fecha : String,
    video : String,
    tituloCancion : String,
    likes : Number,
    shares : Number,
    comentarios : Array<Comentario>,
    hashtags: Array<Hashtag>
});

export const TiktokSchema = mongoose.model('tiktoks', schema);