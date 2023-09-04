import mongoose, { Schema }  from "mongoose";
import {Usuario, BaseUsuario} from './usuarios.model';

const schema = new mongoose.Schema<Usuario>({
    id: String,
    usuario: String,
    password: String,
    nombre: String,
    seguidores: Array<BaseUsuario>,
    siguiendo: Array<BaseUsuario>
});

export const UsuarioSchema = mongoose.model('usuarios', schema);