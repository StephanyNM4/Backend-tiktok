import mongoose from "mongoose";

export interface BaseUsuario {
    id: string;
    usuario: string;
}

export interface Usuario extends BaseUsuario{
    _id?: mongoose.Types.ObjectId,
    password: string;
    nombre: string;
    seguidores: Array<BaseUsuario>;
    siguiendo: Array<BaseUsuario>;
}