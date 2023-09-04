"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevoComentario = exports.obtenerComentarios = exports.obtenerTiktoks = exports.agregar = void 0;
const tiktoks_schema_1 = require("../models/tiktoks.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const agregar = (req, res) => {
    let tiktok = new tiktoks_schema_1.TiktokSchema(req.body);
    tiktok.save()
        .then((result) => {
        res.send({ status: true, message: 'Tiktok guardado', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.agregar = agregar;
const obtenerTiktoks = (req, res) => {
    tiktoks_schema_1.TiktokSchema.find()
        .then((result) => {
        res.send({ status: true, message: 'Todos los tiktoks obtenidos', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.obtenerTiktoks = obtenerTiktoks;
const obtenerComentarios = (req, res) => {
    tiktoks_schema_1.TiktokSchema.findOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }, { comentarios: true })
        .then((result) => {
        res.send({ status: true, message: 'Comentarios obtenidos', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.obtenerComentarios = obtenerComentarios;
const nuevoComentario = (req, res) => {
    tiktoks_schema_1.TiktokSchema.updateOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }, {
        $push: {
            comentarios: {
                id: req.body.id,
                usuario: req.body.usuario,
                comentario: req.body.comentario
            }
        }
    }).then((result) => {
        res.send({ status: true, message: 'Comentario agregado', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.nuevoComentario = nuevoComentario;
// export const login = (req: Request, res: Response) => {
// }
