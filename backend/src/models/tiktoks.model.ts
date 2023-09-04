import mongoose from "mongoose";

export interface Hashtag {
    id: string;
    hashtag: string;
}

export interface Comentario {
    id: string;
    usuario: string;
    comentario: string;
}

export interface Tiktok {
    _id?: mongoose.Types.ObjectId,
    id : number,
    titulo : string;
    fecha : string;
    video : string;
    tituloCancion : string;
    likes : number;
    shares : number;
    comentarios : Array<Comentario>,
    hashtags: Array<Hashtag>
}

