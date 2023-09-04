"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiktoksUsuariosSeguidos = exports.login = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usuarios_shema_1 = require("../models/usuarios.shema");
const login = (req, res) => {
    usuarios_shema_1.UsuarioSchema.findOne({ usuario: req.body.usuario, password: req.body.password }, { password: false })
        .then((result) => {
        res.send({ status: true, message: 'Login correcto', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.login = login;
//Obtener tiktoks de los usuarios seguidos
const tiktoksUsuariosSeguidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idusuarioIngresado = req.params.id;
        const result = yield usuarios_shema_1.UsuarioSchema.aggregate([
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
                    _id: new mongoose_1.default.Types.ObjectId(idusuarioIngresado),
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.tiktoksUsuariosSeguidos = tiktoksUsuariosSeguidos;
// export const login = (req: Request, res: Response) => {
// }
